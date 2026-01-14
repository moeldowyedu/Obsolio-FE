# Backend Architecture - PHP API

## Overview

This document outlines the backend architecture for the Aasim AI Judge Agent PHP API.

## Technology Stack

- **Language:** PHP 8.2+
- **Framework:** Slim Framework 4 (lightweight REST API)
- **Database:** MariaDB 10.11+ with PDO
- **Authentication:** JWT (Firebase JWT library)
- **Validation:** Respect/Validation
- **File Handling:** Intervention/Image, FFmpeg
- **PDF Processing:** TCPDF / mPDF
- **Queue:** Custom queue or Redis-based
- **Logging:** Monolog
- **Testing:** PHPUnit
- **Documentation:** OpenAPI/Swagger

---

## Project Structure

```
backend/
├── public/
│   └── index.php              # Entry point
│
├── src/
│   ├── Controllers/           # Request handlers
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   ├── SubmissionController.php
│   │   ├── EvaluationController.php
│   │   ├── CriteriaController.php
│   │   └── ReportController.php
│   │
│   ├── Models/                # Database models
│   │   ├── User.php
│   │   ├── Submission.php
│   │   ├── SubmissionFile.php
│   │   ├── Evaluation.php
│   │   ├── EvaluationScore.php
│   │   ├── EvaluationCriteria.php
│   │   └── Report.php
│   │
│   ├── Middleware/            # Middleware
│   │   ├── AuthMiddleware.php
│   │   ├── CorsMiddleware.php
│   │   ├── RateLimitMiddleware.php
│   │   ├── ValidationMiddleware.php
│   │   └── LoggingMiddleware.php
│   │
│   ├── Services/              # Business logic
│   │   ├── AuthService.php
│   │   ├── SubmissionService.php
│   │   ├── EvaluationService.php
│   │   ├── AIService.php
│   │   ├── FileService.php
│   │   ├── ReportService.php
│   │   └── NotificationService.php
│   │
│   ├── Repositories/          # Data access layer
│   │   ├── UserRepository.php
│   │   ├── SubmissionRepository.php
│   │   ├── EvaluationRepository.php
│   │   └── CriteriaRepository.php
│   │
│   ├── Validators/            # Input validation
│   │   ├── AuthValidator.php
│   │   ├── SubmissionValidator.php
│   │   └── CriteriaValidator.php
│   │
│   ├── Database/              # Database management
│   │   ├── Connection.php
│   │   ├── QueryBuilder.php
│   │   └── Migrations/
│   │       ├── 001_create_users_table.php
│   │       ├── 002_create_submissions_table.php
│   │       └── ...
│   │
│   ├── Utils/                 # Helper functions
│   │   ├── JWTHelper.php
│   │   ├── FileHelper.php
│   │   ├── StringHelper.php
│   │   └── ResponseHelper.php
│   │
│   ├── Exceptions/            # Custom exceptions
│   │   ├── ValidationException.php
│   │   ├── AuthException.php
│   │   └── NotFoundException.php
│   │
│   └── Queue/                 # Background jobs
│       ├── QueueManager.php
│       ├── Jobs/
│       │   ├── ProcessEvaluationJob.php
│       │   ├── GenerateReportJob.php
│       │   └── SendNotificationJob.php
│       └── Worker.php
│
├── config/                    # Configuration
│   ├── app.php
│   ├── database.php
│   ├── jwt.php
│   └── services.php
│
├── storage/                   # File storage
│   ├── uploads/
│   │   ├── videos/
│   │   ├── audio/
│   │   ├── documents/
│   │   └── code/
│   ├── reports/
│   └── logs/
│
├── tests/                     # Test suites
│   ├── Unit/
│   ├── Integration/
│   └── Feature/
│
├── vendor/                    # Composer dependencies
│
├── .env.example
├── .htaccess
├── composer.json
├── phpunit.xml
└── README.md
```

---

## Core Components

### 1. Entry Point (index.php)

```php
<?php
// public/index.php

use Slim\Factory\AppFactory;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Create container
$container = new Container();
require __DIR__ . '/../config/services.php';

// Create Slim app
AppFactory::setContainer($container);
$app = AppFactory::create();

// Add middleware
$app->addRoutingMiddleware();
$app->add(new \App\Middleware\CorsMiddleware());
$app->add(new \App\Middleware\RateLimitMiddleware());

// Error middleware
$errorMiddleware = $app->addErrorMiddleware(
    $_ENV['APP_DEBUG'] === 'true',
    true,
    true
);

// Load routes
require __DIR__ . '/../src/routes.php';

// Run app
$app->run();
```

### 2. Routes Configuration

```php
<?php
// src/routes.php

use Slim\Routing\RouteCollectorProxy;
use App\Controllers\AuthController;
use App\Controllers\UserController;
use App\Controllers\SubmissionController;
use App\Middleware\AuthMiddleware;

// Public routes
$app->group('/api/v1', function (RouteCollectorProxy $group) {

    // Authentication
    $group->post('/auth/register', [AuthController::class, 'register']);
    $group->post('/auth/login', [AuthController::class, 'login']);
    $group->post('/auth/refresh', [AuthController::class, 'refresh']);

    // Protected routes
    $group->group('', function (RouteCollectorProxy $protected) {

        // Auth
        $protected->post('/auth/logout', [AuthController::class, 'logout']);

        // Users
        $protected->get('/users/me', [UserController::class, 'getCurrentUser']);
        $protected->put('/users/me', [UserController::class, 'updateProfile']);

        // Submissions
        $protected->get('/submissions', [SubmissionController::class, 'list']);
        $protected->post('/submissions', [SubmissionController::class, 'create']);
        $protected->get('/submissions/{uuid}', [SubmissionController::class, 'get']);
        $protected->delete('/submissions/{uuid}', [SubmissionController::class, 'delete']);

        // Evaluations
        $protected->get('/evaluations/{uuid}', [EvaluationController::class, 'get']);
        $protected->post('/submissions/{uuid}/evaluate', [EvaluationController::class, 'evaluate']);

        // Criteria
        $protected->get('/criteria', [CriteriaController::class, 'list']);
        $protected->get('/criteria/{uuid}', [CriteriaController::class, 'get']);
        $protected->post('/criteria', [CriteriaController::class, 'create']);

        // Reports
        $protected->post('/evaluations/{uuid}/reports', [ReportController::class, 'generate']);
        $protected->get('/reports/{uuid}/download', [ReportController::class, 'download']);

    })->add(new AuthMiddleware());
});
```

### 3. Database Connection

```php
<?php
// src/Database/Connection.php

namespace App\Database;

use PDO;
use PDOException;

class Connection
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            try {
                $host = $_ENV['DB_HOST'];
                $port = $_ENV['DB_PORT'];
                $dbname = $_ENV['DB_NAME'];
                $username = $_ENV['DB_USER'];
                $password = $_ENV['DB_PASSWORD'];

                $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

                self::$instance = new PDO($dsn, $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $e) {
                throw new \Exception("Database connection failed: " . $e->getMessage());
            }
        }

        return self::$instance;
    }
}
```

### 4. Base Model

```php
<?php
// src/Models/BaseModel.php

namespace App\Models;

use App\Database\Connection;
use PDO;

abstract class BaseModel
{
    protected PDO $db;
    protected string $table;
    protected string $primaryKey = 'id';

    public function __construct()
    {
        $this->db = Connection::getInstance();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = ? AND deleted_at IS NULL"
        );
        $stmt->execute([$id]);
        $result = $stmt->fetch();

        return $result ?: null;
    }

    public function findByUuid(string $uuid): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE uuid = ? AND deleted_at IS NULL"
        );
        $stmt->execute([$uuid]);
        $result = $stmt->fetch();

        return $result ?: null;
    }

    public function create(array $data): int
    {
        $fields = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));

        $stmt = $this->db->prepare(
            "INSERT INTO {$this->table} ({$fields}) VALUES ({$placeholders})"
        );
        $stmt->execute(array_values($data));

        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $fields = implode(' = ?, ', array_keys($data)) . ' = ?';

        $stmt = $this->db->prepare(
            "UPDATE {$this->table} SET {$fields} WHERE {$this->primaryKey} = ?"
        );

        return $stmt->execute([...array_values($data), $id]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE {$this->table} SET deleted_at = NOW() WHERE {$this->primaryKey} = ?"
        );

        return $stmt->execute([$id]);
    }
}
```

### 5. User Model

```php
<?php
// src/Models/User.php

namespace App\Models;

class User extends BaseModel
{
    protected string $table = 'users';

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE email = ? AND deleted_at IS NULL"
        );
        $stmt->execute([$email]);
        $result = $stmt->fetch();

        return $result ?: null;
    }

    public function createUser(array $data): int
    {
        $data['uuid'] = $this->generateUuid();
        $data['password_hash'] = password_hash($data['password'], PASSWORD_BCRYPT);
        unset($data['password']);

        return $this->create($data);
    }

    private function generateUuid(): string
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}
```

### 6. Auth Controller

```php
<?php
// src/Controllers/AuthController.php

namespace App\Controllers;

use App\Services\AuthService;
use App\Validators\AuthValidator;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AuthController
{
    private AuthService $authService;
    private AuthValidator $validator;

    public function __construct(AuthService $authService, AuthValidator $validator)
    {
        $this->authService = $authService;
        $this->validator = $validator;
    }

    public function register(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        // Validate
        $errors = $this->validator->validateRegistration($data);
        if (!empty($errors)) {
            return $this->jsonResponse($response, [
                'success' => false,
                'error' => [
                    'code' => 'VALIDATION_ERROR',
                    'message' => 'Validation failed',
                    'details' => $errors
                ]
            ], 422);
        }

        try {
            $result = $this->authService->register($data);

            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'error' => [
                    'code' => 'REGISTRATION_FAILED',
                    'message' => $e->getMessage()
                ]
            ], 400);
        }
    }

    public function login(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        try {
            $result = $this->authService->login(
                $data['email'] ?? '',
                $data['password'] ?? ''
            );

            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'error' => [
                    'code' => 'AUTH_FAILED',
                    'message' => 'Invalid credentials'
                ]
            ], 401);
        }
    }

    private function jsonResponse(Response $response, array $data, int $status = 200): Response
    {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
```

### 7. Auth Service

```php
<?php
// src/Services/AuthService.php

namespace App\Services;

use App\Models\User;
use App\Utils\JWTHelper;

class AuthService
{
    private User $userModel;
    private JWTHelper $jwt;

    public function __construct(User $userModel, JWTHelper $jwt)
    {
        $this->userModel = $userModel;
        $this->jwt = $jwt;
    }

    public function register(array $data): array
    {
        // Check if email exists
        if ($this->userModel->findByEmail($data['email'])) {
            throw new \Exception('Email already registered');
        }

        // Create user
        $userId = $this->userModel->createUser($data);
        $user = $this->userModel->find($userId);

        // Generate tokens
        $token = $this->jwt->generateToken($user);
        $refreshToken = $this->jwt->generateRefreshToken($user);

        // Remove sensitive data
        unset($user['password_hash']);

        return [
            'user' => $user,
            'token' => $token,
            'refresh_token' => $refreshToken,
            'expires_in' => 3600
        ];
    }

    public function login(string $email, string $password): array
    {
        $user = $this->userModel->findByEmail($email);

        if (!$user || !password_verify($password, $user['password_hash'])) {
            throw new \Exception('Invalid credentials');
        }

        // Generate tokens
        $token = $this->jwt->generateToken($user);
        $refreshToken = $this->jwt->generateRefreshToken($user);

        // Update last login
        $this->userModel->update($user['id'], [
            'last_login_at' => date('Y-m-d H:i:s')
        ]);

        unset($user['password_hash']);

        return [
            'user' => $user,
            'token' => $token,
            'refresh_token' => $refreshToken,
            'expires_in' => 3600
        ];
    }
}
```

### 8. JWT Helper

```php
<?php
// src/Utils/JWTHelper.php

namespace App\Utils;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHelper
{
    private string $secretKey;
    private string $algorithm = 'HS256';

    public function __construct()
    {
        $this->secretKey = $_ENV['JWT_SECRET'];
    }

    public function generateToken(array $user): string
    {
        $payload = [
            'iss' => $_ENV['APP_URL'],
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour
            'user_id' => $user['id'],
            'uuid' => $user['uuid'],
            'role' => $user['role']
        ];

        return JWT::encode($payload, $this->secretKey, $this->algorithm);
    }

    public function generateRefreshToken(array $user): string
    {
        $payload = [
            'iss' => $_ENV['APP_URL'],
            'iat' => time(),
            'exp' => time() + (7 * 24 * 3600), // 7 days
            'user_id' => $user['id'],
            'type' => 'refresh'
        ];

        return JWT::encode($payload, $this->secretKey, $this->algorithm);
    }

    public function validateToken(string $token): ?object
    {
        try {
            return JWT::decode($token, new Key($this->secretKey, $this->algorithm));
        } catch (\Exception $e) {
            return null;
        }
    }
}
```

### 9. Auth Middleware

```php
<?php
// src/Middleware/AuthMiddleware.php

namespace App\Middleware;

use App\Utils\JWTHelper;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response;

class AuthMiddleware implements MiddlewareInterface
{
    private JWTHelper $jwt;

    public function __construct(JWTHelper $jwt)
    {
        $this->jwt = $jwt;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return $this->unauthorizedResponse();
        }

        $token = $matches[1];
        $payload = $this->jwt->validateToken($token);

        if (!$payload) {
            return $this->unauthorizedResponse();
        }

        // Add user info to request
        $request = $request->withAttribute('user_id', $payload->user_id);
        $request = $request->withAttribute('user_role', $payload->role);

        return $handler->handle($request);
    }

    private function unauthorizedResponse(): ResponseInterface
    {
        $response = new Response();
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHORIZED',
                'message' => 'Authentication required'
            ]
        ]));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(401);
    }
}
```

---

## AI Integration Service

```php
<?php
// src/Services/AIService.php

namespace App\Services;

use GuzzleHttp\Client;

class AIService
{
    private Client $httpClient;
    private string $apiKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->httpClient = new Client();
        $this->apiKey = $_ENV['OPENAI_API_KEY'];
        $this->baseUrl = 'https://api.openai.com/v1';
    }

    public function evaluateContent(array $files, array $criteria): array
    {
        // Process files and create evaluation prompt
        $prompt = $this->buildEvaluationPrompt($criteria);

        // Call OpenAI API
        $response = $this->httpClient->post("{$this->baseUrl}/chat/completions", [
            'headers' => [
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json'
            ],
            'json' => [
                'model' => 'gpt-4-vision-preview',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are an expert evaluator...'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'max_tokens' => 4000
            ]
        ]);

        $result = json_decode($response->getBody(), true);

        return $this->parseAIResponse($result, $criteria);
    }

    private function buildEvaluationPrompt(array $criteria): string
    {
        // Build prompt based on criteria
        return "Evaluate the submission based on the following criteria...";
    }

    private function parseAIResponse(array $response, array $criteria): array
    {
        // Parse AI response and extract scores
        return [
            'overall_score' => 85.5,
            'confidence' => 92.0,
            'scores' => [],
            'insights' => []
        ];
    }
}
```

---

## Configuration

### Environment Variables

```env
# .env.example

# Application
APP_NAME=Aasim
APP_ENV=development
APP_DEBUG=true
APP_URL=https://api.obsolio.com/

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aasim_db
DB_USER=root
DB_PASSWORD=

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=3600

# OpenAI
OPENAI_API_KEY=your-openai-key

# File Upload
MAX_FILE_SIZE=524288000
UPLOAD_PATH=/storage/uploads

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## Composer Dependencies

```json
{
  "require": {
    "php": "^8.2",
    "slim/slim": "^4.12",
    "slim/psr7": "^1.6",
    "php-di/php-di": "^7.0",
    "vlucas/phpdotenv": "^5.5",
    "firebase/php-jwt": "^6.8",
    "respect/validation": "^2.2",
    "monolog/monolog": "^3.4",
    "guzzlehttp/guzzle": "^7.8"
  },
  "require-dev": {
    "phpunit/phpunit": "^10.3"
  }
}
```

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
