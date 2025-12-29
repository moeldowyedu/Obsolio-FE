/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SuccessResponse {
  /** @example true */
  success?: boolean;
  /** @example "Operation completed successfully" */
  message?: string;
  data?: object;
}

export interface ErrorResponse {
  /** @example false */
  success?: boolean;
  /** @example "An error occurred" */
  message?: string;
  /** @example "Error details" */
  error?: string;
}

export interface ValidationErrorResponse {
  /** @example false */
  success?: boolean;
  /** @example "The given data was invalid" */
  message?: string;
  /** @example {"email":["The email field is required"]} */
  errors?: object;
}

export interface PaginatedResponse {
  /** @example true */
  success?: boolean;
  data?: {
    data?: object[];
    /** @example 1 */
    current_page?: number;
    /** @example 10 */
    last_page?: number;
    /** @example 20 */
    per_page?: number;
    /** @example 200 */
    total?: number;
    /** @example 1 */
    from?: number;
    /** @example 20 */
    to?: number;
  };
}

/** Organization Response */
export interface OrganizationResponse {
  /**
   * @format uuid
   * @example "98765432-1234-1234-1234-1234567890ab"
   */
  id?: string;
  /** @example "Acme Corp" */
  name?: string;
  /** @example "ACME" */
  short_name?: string;
  /** @example "+1234567890" */
  phone?: string;
  /** @example "Technology" */
  industry?: string;
  /** @example "100-500" */
  company_size?: string;
  /** @example "USA" */
  country?: string;
  /** @example "UTC" */
  timezone?: string;
  /** @example "https://example.com/logo.png" */
  logo_url?: string;
  /** @example "We make everything." */
  description?: string;
  /** @format date-time */
  created_at?: string;
  /** @example 10 */
  users_count?: number;
}

/** Tenant Response */
export interface TenantResponse {
  /** @example "my-org" */
  id?: string;
  /** @example "My Organization" */
  name?: string;
  /** @example "MYORG" */
  short_name?: string;
  /** @example "organization" */
  type?: string;
  /** @example "active" */
  status?: string;
  /** @example "my-org" */
  subdomain_preference?: string;
  /**
   * @format date-time
   * @example "2023-10-27T10:00:00.000000Z"
   */
  subdomain_activated_at?: string;
  /** @example true */
  is_on_trial?: boolean;
  /**
   * @format date-time
   * @example "2023-11-03T10:00:00.000000Z"
   */
  trial_ends_at?: string;
  domains?: string[];
  /** @example "https://example.com/logo.png" */
  logo_url?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OBSOLIO API Documentation
 * @version 1.0.0
 * @license Proprietary (https://obsolio.com/terms)
 * @baseUrl /api/v1
 * @contact OBSOLIO Support <admin@obsolio.com>
 *
 *
 * # OBSOLIO API - Organized Endpoint Structure
 *
 * This API provides a clear separation between different user contexts:
 *
 * ## Endpoint Organization
 *
 * ### Public Endpoints
 * - `/auth/*` - Authentication and registration
 * - `/marketplace/*` - Public marketplace for browsing agents
 * - `/subscription-plans` - Pricing information
 *
 * ### Admin Endpoints (System Console)
 * - `/admin/*` - System administration operations
 *   - Tenant management
 *   - User management
 *   - Agent management (global)
 *   - Analytics and reports
 *   - Audit logs
 *
 * ### Tenant Endpoints (Dashboard)
 * - `/tenant/*` - Tenant-specific operations
 *   - Profile and settings
 *   - Dashboard and statistics
 *   - Organizations
 *   - Agents (installed)
 *   - Subscriptions and billing
 *   - Activities and sessions
 *
 * ### Webhooks
 * - `/webhooks/*` - External callback endpoints
 *
 * ## Authentication
 *
 * Most endpoints require JWT Bearer token authentication. Include the token in the Authorization header:
 *
 * ```
 * Authorization: Bearer <your-jwt-token>
 * ```
 *
 * Public endpoints (auth, marketplace) do not require authentication.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Get all agent categories ordered by display_order with agents count
     *
     * @tags Admin - Agent Categories
     * @name AdminListAgentCategories
     * @summary List all agent categories
     * @request GET:/api/v1/admin/agent-categories
     * @secure
     */
    adminListAgentCategories: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            /** @format uuid */
            id?: string;
            name?: string;
            slug?: string;
            description?: string;
            icon?: string;
            display_order?: number;
            agents_count?: number;
            /** @format date-time */
            created_at?: string;
            /** @format date-time */
            updated_at?: string;
          }[];
        },
        any
      >({
        path: `/api/v1/admin/agent-categories`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new agent category
     *
     * @tags Admin - Agent Categories
     * @name AdminCreateAgentCategory
     * @summary Create agent category
     * @request POST:/api/v1/admin/agent-categories
     * @secure
     */
    adminCreateAgentCategory: (
      data: {
        /** @example "Data Processing" */
        name: string;
        /** @example "data-processing" */
        slug: string;
        description?: string;
        /** @example "database" */
        icon?: string;
        /** @example 1 */
        display_order?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          data?: object;
        },
        void
      >({
        path: `/api/v1/admin/agent-categories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing agent category
     *
     * @tags Admin - Agent Categories
     * @name AdminUpdateAgentCategory
     * @summary Update agent category
     * @request PUT:/api/v1/admin/agent-categories/{id}
     * @secure
     */
    adminUpdateAgentCategory: (
      id: string,
      data: {
        name?: string;
        slug?: string;
        description?: string;
        icon?: string;
        display_order?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          data?: object;
        },
        void
      >({
        path: `/api/v1/admin/agent-categories/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an agent category (only if no agents exist in category)
     *
     * @tags Admin - Agent Categories
     * @name AdminDeleteAgentCategory
     * @summary Delete agent category
     * @request DELETE:/api/v1/admin/agent-categories/{id}
     * @secure
     */
    adminDeleteAgentCategory: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
        },
        void
      >({
        path: `/api/v1/admin/agent-categories/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all agent endpoints with filters
     *
     * @tags Admin - Agent Endpoints
     * @name AdminListAgentEndpoints
     * @summary List all agent endpoints
     * @request GET:/api/v1/admin/agent-endpoints
     * @secure
     */
    adminListAgentEndpoints: (
      query?: {
        /**
         * Filter by agent ID
         * @format uuid
         */
        agent_id?: string;
        /** Filter by endpoint type */
        type?: "trigger" | "callback";
        /** Filter by active status */
        is_active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            /** @format uuid */
            id?: string;
            /** @format uuid */
            agent_id?: string;
            agent_name?: string;
            type?: "trigger" | "callback";
            url?: string;
            secret?: string;
            is_active?: boolean;
            /** @format date-time */
            created_at?: string;
            /** @format date-time */
            updated_at?: string;
          }[];
        },
        any
      >({
        path: `/api/v1/admin/agent-endpoints`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new agent endpoint (trigger or callback)
     *
     * @tags Admin - Agent Endpoints
     * @name AdminCreateAgentEndpoint
     * @summary Create agent endpoint
     * @request POST:/api/v1/admin/agent-endpoints
     * @secure
     */
    adminCreateAgentEndpoint: (
      data: {
        /** @format uuid */
        agent_id: string;
        type: "trigger" | "callback";
        /** @format uri */
        url: string;
        /** Optional, auto-generated if not provided */
        secret?: string;
        /** @example true */
        is_active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          data?: object;
        },
        void
      >({
        path: `/api/v1/admin/agent-endpoints`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get detailed information about a specific agent endpoint
     *
     * @tags Admin - Agent Endpoints
     * @name AdminGetAgentEndpoint
     * @summary Get agent endpoint details
     * @request GET:/api/v1/admin/agent-endpoints/{id}
     * @secure
     */
    adminGetAgentEndpoint: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        void
      >({
        path: `/api/v1/admin/agent-endpoints/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing agent endpoint
     *
     * @tags Admin - Agent Endpoints
     * @name AdminUpdateAgentEndpoint
     * @summary Update agent endpoint
     * @request PUT:/api/v1/admin/agent-endpoints/{id}
     * @secure
     */
    adminUpdateAgentEndpoint: (
      id: string,
      data: {
        /** @format uri */
        url?: string;
        secret?: string;
        is_active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          data?: object;
        },
        void
      >({
        path: `/api/v1/admin/agent-endpoints/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an agent endpoint
     *
     * @tags Admin - Agent Endpoints
     * @name AdminDeleteAgentEndpoint
     * @summary Delete agent endpoint
     * @request DELETE:/api/v1/admin/agent-endpoints/{id}
     * @secure
     */
    adminDeleteAgentEndpoint: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
        },
        void
      >({
        path: `/api/v1/admin/agent-endpoints/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get paginated list of all agent execution history with filters
     *
     * @tags Admin - Agent Runs
     * @name AdminListAgentRuns
     * @summary List all agent executions
     * @request GET:/api/v1/admin/agent-runs
     * @secure
     */
    adminListAgentRuns: (
      query?: {
        /** Page number */
        page?: number;
        /** Items per page (max 100) */
        per_page?: number;
        /** Search by agent name or run ID */
        search?: string;
        /** Filter by state */
        state?:
          | "pending"
          | "accepted"
          | "running"
          | "completed"
          | "failed"
          | "cancelled"
          | "timeout";
        /** Sort order */
        sort?: "started_at_desc" | "started_at_asc" | "duration_desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            data?: {
              /** @format uuid */
              id?: string;
              /** @format uuid */
              agent_id?: string;
              agent_name?: string;
              status?: string;
              input?: object;
              output?: object;
              error?: string;
              /** @format date-time */
              started_at?: string;
              /** @format date-time */
              completed_at?: string;
              duration_ms?: number;
              triggered_by?: object;
            }[];
            current_page?: number;
            last_page?: number;
            per_page?: number;
            total?: number;
          };
        },
        any
      >({
        path: `/api/v1/admin/agent-runs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Activate multiple agents at once
     *
     * @tags Admin - Agents
     * @name AdminBulkActivateAgents
     * @summary Bulk activate agents
     * @request POST:/api/v1/admin/agents/bulk-activate
     * @secure
     */
    adminBulkActivateAgents: (
      data: {
        /** @example ["uuid1","uuid2"] */
        agent_ids: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          activated_count?: number;
        },
        any
      >({
        path: `/api/v1/admin/agents/bulk-activate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deactivate multiple agents at once
     *
     * @tags Admin - Agents
     * @name AdminBulkDeactivateAgents
     * @summary Bulk deactivate agents
     * @request POST:/api/v1/admin/agents/bulk-deactivate
     * @secure
     */
    adminBulkDeactivateAgents: (
      data: {
        /** @example ["uuid1","uuid2"] */
        agent_ids: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          deactivated_count?: number;
        },
        any
      >({
        path: `/api/v1/admin/agents/bulk-deactivate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  v1 = {
    /**
     * @description Get detailed information about a specific agent execution run
     *
     * @tags Admin - Agent Runs
     * @name AdminGetAgentRun
     * @summary Get specific agent run details
     * @request GET:/v1/admin/agent-runs/{id}
     * @secure
     */
    adminGetAgentRun: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        void
      >({
        path: `/v1/admin/agent-runs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get detailed information about a specific agent (admin view)
     *
     * @tags Admin - Agents
     * @name AdminGetAgent
     * @summary Get agent details
     * @request GET:/v1/admin/agents/{id}
     * @secure
     */
    adminGetAgent: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        void
      >({
        path: `/v1/admin/agents/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get paginated list of agent execution history for the current tenant with optional filters
     *
     * @tags Tenant - Agent Runs
     * @name GetTenantAgentRuns
     * @summary Get list of agent execution runs
     * @request GET:/v1/tenant/agent-runs
     * @secure
     */
    getTenantAgentRuns: (
      query?: {
        /**
         * Filter by agent ID
         * @format uuid
         */
        agent_id?: string;
        /** Filter by status */
        status?: "pending" | "running" | "completed" | "failed";
        /** Page number */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        any
      >({
        path: `/v1/tenant/agent-runs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Initiates asynchronous execution of an agent. The agent will process the request in the background and send results to the callback webhook.
     *
     * @tags Tenant - Agents
     * @name ExecuteAgent
     * @summary Execute an agent asynchronously
     * @request POST:/v1/tenant/agents/{id}/run
     * @secure
     */
    executeAgent: (
      id: string,
      data: {
        /**
         * Input parameters for the agent execution
         * @example {"query":"What is the weather today?","location":"Cairo"}
         */
        input: object;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Agent execution initiated" */
          message?: string;
          data?: {
            /**
             * @format uuid
             * @example "660e8400-e29b-41d4-a716-446655440001"
             */
            run_id?: string;
            /** @example "running" */
            status?: string;
            agent?: {
              /**
               * @format uuid
               * @example "550e8400-e29b-41d4-a716-446655440000"
               */
              id?: string;
              /** @example "Weather Agent" */
              name?: string;
              /** @example "n8n" */
              runtime_type?: string;
            };
          };
        },
        | {
            /** @example false */
            success?: boolean;
            /** @example "Agent is not active" */
            message?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Agent not found" */
            message?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Validation failed" */
            message?: string;
            errors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Failed to connect to agent" */
            message?: string;
          }
      >({
        path: `/v1/tenant/agents/${id}/run`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the status and results of an agent execution run
     *
     * @tags Tenant - Agent Runs
     * @name GetAgentRunStatus
     * @summary Get agent execution status
     * @request GET:/v1/tenant/agent-runs/{run_id}
     * @secure
     */
    getAgentRunStatus: (runId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            /**
             * @format uuid
             * @example "660e8400-e29b-41d4-a716-446655440001"
             */
            run_id?: string;
            /** @example "completed" */
            status?: "pending" | "running" | "completed" | "failed";
            /** @example {"query":"What is the weather today?","location":"Cairo"} */
            input?: object;
            /** @example {"result":"The weather in Cairo is sunny, 28°C"} */
            output?: object | null;
            /** @example null */
            error?: string | null;
            /**
             * @format date-time
             * @example "2025-12-27T10:00:00.000000Z"
             */
            created_at?: string;
            /**
             * @format date-time
             * @example "2025-12-27T10:00:05.000000Z"
             */
            updated_at?: string;
            agent?: {
              /**
               * @format uuid
               * @example "550e8400-e29b-41d4-a716-446655440000"
               */
              id?: string;
              /** @example "Weather Agent" */
              name?: string;
              /** @example "n8n" */
              runtime_type?: string;
            };
          };
        },
        | {
            /** @example false */
            success?: boolean;
            /** @example "Agent run not found" */
            message?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Internal server error" */
            message?: string;
          }
      >({
        path: `/v1/tenant/agent-runs/${runId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Webhook endpoint for agents to send execution results. This endpoint does not require JWT authentication but validates a secret token instead.
     *
     * @tags Webhooks
     * @name AgentExecutionCallback
     * @summary Agent execution callback webhook
     * @request POST:/v1/webhooks/agents/callback
     */
    agentExecutionCallback: (
      data: {
        /**
         * @format uuid
         * @example "660e8400-e29b-41d4-a716-446655440001"
         */
        run_id: string;
        /** @example "completed" */
        status: "completed" | "failed";
        /** @example {"result":"The weather in Cairo is sunny, 28°C"} */
        output?: object | null;
        /** @example null */
        error?: string | null;
        /** @example "your-callback-secret-token" */
        secret: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Callback received and processed" */
          message?: string;
          data?: {
            /**
             * @format uuid
             * @example "660e8400-e29b-41d4-a716-446655440001"
             */
            run_id?: string;
            /** @example "completed" */
            status?: string;
          };
        },
        | {
            /** @example false */
            success?: boolean;
            /** @example "No active callback endpoint configured for this agent" */
            message?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Invalid secret" */
            message?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Agent run not found" */
            message?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Validation failed" */
            message?: string;
            errors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Internal server error" */
            message?: string;
          }
      >({
        path: `/v1/webhooks/agents/callback`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get detailed information about a specific agent in the marketplace
     *
     * @tags Marketplace
     * @name GetMarketplaceAgent
     * @summary Get marketplace agent details
     * @request GET:/v1/marketplace/agents/{id}
     */
    getMarketplaceAgent: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        void
      >({
        path: `/v1/marketplace/agents/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Authentication
     * @name Register
     * @summary Register new user with tenant
     * @request POST:/auth/register
     */
    register: (
      data: {
        /**
         * Account type
         * @example "personal"
         */
        type: "personal" | "organization";
        /** @example "John Doe" */
        fullName: string;
        /**
         * @format email
         * @example "john.doe@example.com"
         */
        email: string;
        /**
         * @format password
         * @example "SecurePass123!"
         */
        password: string;
        /**
         * Phone with country code
         * @example "+1234567890"
         */
        phone: string;
        /** @example "USA" */
        country: string;
        /**
         * Required for ALL types. Unique workspace URL identifier.
         * @example "my-workspace"
         */
        subdomain: string;
        /**
         * Required if type=organization
         * @example "Acme Corporation"
         */
        organizationFullName?: string;
        /**
         * Optional display short name
         * @example "acme"
         */
        organizationShortName?: string;
        /**
         * Optional
         * @example "https://example.com/logo.png"
         */
        organizationLogo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Registration successful" */
          message?: string;
          data?: {
            user?: {
              /** @example 1 */
              id?: number;
              /** @example "John Doe" */
              name?: string;
              /** @example "john.doe@example.com" */
              email?: string;
              /** @example "+1234567890" */
              phone?: string;
              /** @example "USA" */
              country?: string;
              /** @example "active" */
              status?: string;
              /** @example false */
              is_system_admin?: boolean;
              /**
               * @format date-time
               * @example "2023-10-27T09:00:00.000000Z"
               */
              created_at?: string;
            };
            tenant?: {
              /** @example "john-doe-abc1" */
              id?: string;
              /** @example "John Doe's Workspace" */
              name?: string;
              /** @example "personal" */
              type?: string;
              /** @example "john-doe-abc1" */
              short_name?: string;
            };
            /** @example "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." */
            token?: string;
            /** @example "bearer" */
            token_type?: string;
            /** @example 3600 */
            expires_in?: number;
            /** @example "https://john-doe-abc1.obsolio.com" */
            workspace_url?: string;
          };
        },
        void
      >({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name CheckSubdomain
     * @summary Check if a subdomain is available
     * @request POST:/auth/check-subdomain
     */
    checkSubdomain: (
      data: {
        /** @example "my-workspace" */
        subdomain: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          available?: boolean;
          /** @example "Subdomain is available" */
          message?: string;
        },
        any
      >({
        path: `/auth/check-subdomain`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name LookupTenant
     * @summary Lookup tenants for a user
     * @request POST:/auth/lookup-tenant
     */
    lookupTenant: (
      data: {
        /**
         * Email or Phone
         * @example "john.doe@example.com"
         */
        identifier: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          tenants?: {
            /** @example "my-workspace" */
            id?: string;
            /** @example "My Workspace" */
            name?: string;
            /** @example "https://my-workspace.obsolio.com/login" */
            login_url?: string;
          }[];
        },
        any
      >({
        path: `/auth/lookup-tenant`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Login
     * @summary Login user
     * @request POST:/auth/login
     */
    login: (
      data: {
        /**
         * @format email
         * @example "john.doe@example.com"
         */
        email: string;
        /**
         * @format password
         * @example "SecurePass123!"
         */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Login successful" */
          message?: string;
          data?: {
            user?: {
              /** @example 1 */
              id?: number;
              /** @example "John Doe" */
              name?: string;
              /** @example "john.doe@example.com" */
              email?: string;
              /** @example "+1234567890" */
              phone?: string;
              /** @example "USA" */
              country?: string;
              /** @example "active" */
              status?: string;
              /** @example false */
              is_system_admin?: boolean;
            };
            /** @example "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." */
            token?: string;
            /** @example "bearer" */
            token_type?: string;
            /** @example 3600 */
            expires_in?: number;
            /** @example "550e8400-e29b-41d4-a716-446655440000" */
            session_id?: string;
          };
        },
        void
      >({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Me
     * @summary Get current user
     * @request GET:/auth/me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            /** @example 1 */
            id?: number;
            /** @example "John Doe" */
            name?: string;
            /** @example "john.doe@example.com" */
            email?: string;
            /** @example "+1234567890" */
            phone?: string;
            /** @example "USA" */
            country?: string;
            /** @example "active" */
            status?: string;
            /** @example false */
            is_system_admin?: boolean;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            last_login_at?: string;
            /**
             * @format date-time
             * @example "2023-10-27T09:00:00.000000Z"
             */
            created_at?: string;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            updated_at?: string;
            tenant?: {
              /** @example 1 */
              id?: number;
              /** @example "Acme Corp" */
              name?: string;
              /** @example "acme-corp" */
              slug?: string;
            };
            teams?: object[];
            assignments?: object[];
            roles?: object[];
          };
        },
        void
      >({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Logout
     * @summary Logout user
     * @request POST:/auth/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Successfully logged out" */
          message?: string;
        },
        void
      >({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Refresh
     * @summary Refresh token
     * @request POST:/auth/refresh
     * @secure
     */
    refresh: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Token refreshed successfully" */
          message?: string;
          data?: {
            /** @example "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." */
            token?: string;
            /** @example "bearer" */
            token_type?: string;
            /** @example 3600 */
            expires_in?: number;
          };
        },
        void
      >({
        path: `/auth/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name UpdateProfile
     * @summary Update user profile
     * @request PUT:/auth/profile
     * @secure
     */
    updateProfile: (
      data: {
        /** @example "John Smith" */
        name?: string;
        /** @example "+1234567890" */
        phone?: string;
        /** @example "USA" */
        country?: string;
        /** @example "https://example.com/new-avatar.jpg" */
        avatar_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Profile updated successfully" */
          message?: string;
          data?: {
            /** @example 1 */
            id?: number;
            /** @example "John Smith" */
            name?: string;
            /** @example "john.doe@example.com" */
            email?: string;
            /** @example "+1234567890" */
            phone?: string;
          };
        },
        void
      >({
        path: `/auth/profile`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name ChangePassword
     * @summary Change user password
     * @request POST:/auth/change-password
     * @secure
     */
    changePassword: (
      data: {
        /**
         * @format password
         * @example "OldPass123!"
         */
        current_password: string;
        /**
         * @format password
         * @example "NewSecurePass456!"
         */
        new_password: string;
        /**
         * @format password
         * @example "NewSecurePass456!"
         */
        new_password_confirmation: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Password changed successfully" */
          message?: string;
        },
        void
      >({
        path: `/auth/change-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name VerifyEmail
     * @summary Verify email address
     * @request GET:/auth/email/verify/{id}/{hash}
     */
    verifyEmail: (id: number, hash: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Email verified successfully" */
          message?: string;
        },
        any
      >({
        path: `/auth/email/verify/${id}/${hash}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name ResendVerification
     * @summary Resend verification email
     * @request POST:/auth/email/resend
     * @secure
     */
    resendVerification: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Verification link sent" */
          message?: string;
        },
        any
      >({
        path: `/auth/email/resend`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tenants = {
    /**
     * No description
     *
     * @tags Authentication
     * @name CheckAvailability
     * @summary Check if a subdomain is available (GET)
     * @request GET:/tenants/check-availability/{subdomain}
     */
    checkAvailability: (subdomain: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          available?: boolean;
          /** @example "Subdomain is available" */
          message?: string;
        },
        any
      >({
        path: `/tenants/check-availability/${subdomain}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenant
     * @name GetTenants
     * @summary Get all user's tenants
     * @request GET:/tenants
     * @secure
     */
    getTenants: (params: RequestParams = {}) =>
      this.request<
        {
          data?: {
            /** @example "my-org" */
            id?: string;
            /** @example "My Organization" */
            name?: string;
            /** @example "MYORG" */
            short_name?: string;
            /** @example "organization" */
            type?: string;
            /** @example "active" */
            status?: string;
            /** @example "my-org" */
            subdomain_preference?: string;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            subdomain_activated_at?: string;
            /** @example true */
            is_on_trial?: boolean;
            /**
             * @format date-time
             * @example "2023-11-03T10:00:00.000000Z"
             */
            trial_ends_at?: string;
            domains?: string[];
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
          }[];
        },
        any
      >({
        path: `/tenants`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenant
     * @name CreateTenant
     * @summary Create a new tenant
     * @request POST:/tenants
     * @secure
     */
    createTenant: (
      data: {
        /** @example "My Organization" */
        name: string;
        /** @example "MYORG" */
        short_name?: string;
        /** @example "organization" */
        type: "organization" | "individual";
        /** @example "my-organization" */
        slug?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Tenant created successfully" */
          message?: string;
          data?: {
            /** @example "my-org" */
            id?: string;
            /** @example "My Organization" */
            name?: string;
            /** @example "MYORG" */
            short_name?: string;
            /** @example "organization" */
            type?: string;
            /** @example "active" */
            status?: string;
            /** @example "my-org" */
            subdomain_preference?: string;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            subdomain_activated_at?: string;
            /** @example true */
            is_on_trial?: boolean;
            /**
             * @format date-time
             * @example "2023-11-03T10:00:00.000000Z"
             */
            trial_ends_at?: string;
            domains?: string[];
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
          };
        },
        any
      >({
        path: `/tenants`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenant
     * @name SwitchTenant
     * @summary Switch active tenant
     * @request POST:/tenants/{id}/switch
     * @secure
     */
    switchTenant: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Switched to tenant successfully" */
          message?: string;
          data?: {
            /** @example "my-org" */
            id?: string;
            /** @example "My Organization" */
            name?: string;
            /** @example "MYORG" */
            short_name?: string;
            /** @example "organization" */
            type?: string;
            /** @example "active" */
            status?: string;
            /** @example "my-org" */
            subdomain_preference?: string;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            subdomain_activated_at?: string;
            /** @example true */
            is_on_trial?: boolean;
            /**
             * @format date-time
             * @example "2023-11-03T10:00:00.000000Z"
             */
            trial_ends_at?: string;
            domains?: string[];
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
          };
        },
        void
      >({
        path: `/tenants/${id}/switch`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  dashboard = {
    /**
     * No description
     *
     * @tags Dashboard
     * @name GetDashboardStats
     * @summary Get dashboard statistics
     * @request GET:/dashboard/stats
     * @secure
     */
    getDashboardStats: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            users?: object;
            agents?: object;
            workflows?: object;
            organizations?: object;
          };
        },
        void
      >({
        path: `/dashboard/stats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  organizations = {
    /**
     * @description Display a listing of organizations.
     *
     * @tags Organizations
     * @name GetOrganizations
     * @summary List organizations
     * @request GET:/organizations
     * @secure
     */
    getOrganizations: (
      query?: {
        /**
         * Items per page
         * @default 15
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: {
            /**
             * @format uuid
             * @example "98765432-1234-1234-1234-1234567890ab"
             */
            id?: string;
            /** @example "Acme Corp" */
            name?: string;
            /** @example "ACME" */
            short_name?: string;
            /** @example "+1234567890" */
            phone?: string;
            /** @example "Technology" */
            industry?: string;
            /** @example "100-500" */
            company_size?: string;
            /** @example "USA" */
            country?: string;
            /** @example "UTC" */
            timezone?: string;
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
            /** @example "We make everything." */
            description?: string;
            /** @format date-time */
            created_at?: string;
            /** @example 10 */
            users_count?: number;
          }[];
        },
        any
      >({
        path: `/organizations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name CreateOrganization
     * @summary Create organization
     * @request POST:/organizations
     * @secure
     */
    createOrganization: (
      data: {
        /** @example "Acme Corp" */
        name: string;
        /** @example "ACME" */
        short_name?: string;
        /** @example "+1234567890" */
        phone?: string;
        industry?: string;
        company_size?: string;
        country?: string;
        timezone?: string;
        description?: string;
        /** @format uri */
        logo_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: {
            /**
             * @format uuid
             * @example "98765432-1234-1234-1234-1234567890ab"
             */
            id?: string;
            /** @example "Acme Corp" */
            name?: string;
            /** @example "ACME" */
            short_name?: string;
            /** @example "+1234567890" */
            phone?: string;
            /** @example "Technology" */
            industry?: string;
            /** @example "100-500" */
            company_size?: string;
            /** @example "USA" */
            country?: string;
            /** @example "UTC" */
            timezone?: string;
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
            /** @example "We make everything." */
            description?: string;
            /** @format date-time */
            created_at?: string;
            /** @example 10 */
            users_count?: number;
          };
        },
        void
      >({
        path: `/organizations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name GetOrganization
     * @summary Get organization details
     * @request GET:/organizations/{organization}
     * @secure
     */
    getOrganization: (organization: string, params: RequestParams = {}) =>
      this.request<
        {
          data?: {
            /**
             * @format uuid
             * @example "98765432-1234-1234-1234-1234567890ab"
             */
            id?: string;
            /** @example "Acme Corp" */
            name?: string;
            /** @example "ACME" */
            short_name?: string;
            /** @example "+1234567890" */
            phone?: string;
            /** @example "Technology" */
            industry?: string;
            /** @example "100-500" */
            company_size?: string;
            /** @example "USA" */
            country?: string;
            /** @example "UTC" */
            timezone?: string;
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
            /** @example "We make everything." */
            description?: string;
            /** @format date-time */
            created_at?: string;
            /** @example 10 */
            users_count?: number;
          };
        },
        void
      >({
        path: `/organizations/${organization}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name UpdateOrganization
     * @summary Update organization
     * @request PUT:/organizations/{organization}
     * @secure
     */
    updateOrganization: (
      organization: string,
      data: {
        /** @example "Acme Corp" */
        name?: string;
        /** @example "ACME" */
        short_name?: string;
        /** @example "+1234567890" */
        phone?: string;
        industry?: string;
        company_size?: string;
        country?: string;
        timezone?: string;
        description?: string;
        /** @format uri */
        logo_url?: string;
        settings?: object;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: {
            /**
             * @format uuid
             * @example "98765432-1234-1234-1234-1234567890ab"
             */
            id?: string;
            /** @example "Acme Corp" */
            name?: string;
            /** @example "ACME" */
            short_name?: string;
            /** @example "+1234567890" */
            phone?: string;
            /** @example "Technology" */
            industry?: string;
            /** @example "100-500" */
            company_size?: string;
            /** @example "USA" */
            country?: string;
            /** @example "UTC" */
            timezone?: string;
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
            /** @example "We make everything." */
            description?: string;
            /** @format date-time */
            created_at?: string;
            /** @example 10 */
            users_count?: number;
          };
        },
        void
      >({
        path: `/organizations/${organization}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name DeleteOrganization
     * @summary Delete organization
     * @request DELETE:/organizations/{organization}
     * @secure
     */
    deleteOrganization: (organization: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/organizations/${organization}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name SwitchOrganization
     * @summary Switch organization context
     * @request POST:/organizations/{organization}/switch
     * @secure
     */
    switchOrganization: (organization: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/organizations/${organization}/switch`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  permissions = {
    /**
     * @description Get all permissions grouped by category
     *
     * @tags Permissions
     * @name GetPermissions
     * @summary List permissions (grouped)
     * @request GET:/permissions
     * @secure
     */
    getPermissions: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            /** @example "projects" */
            category?: string;
            permissions?: object[];
          }[];
        },
        any
      >({
        path: `/permissions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a flat list of all permissions
     *
     * @tags Permissions
     * @name ListPermissions
     * @summary List permissions (flat)
     * @request GET:/permissions/list
     * @secure
     */
    listPermissions: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object[];
        },
        any
      >({
        path: `/permissions/list`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Permissions
     * @name GetPermission
     * @summary Get permission details
     * @request GET:/permissions/{id}
     * @secure
     */
    getPermission: (id: number, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        void
      >({
        path: `/permissions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  roles = {
    /**
     * No description
     *
     * @tags Roles
     * @name GetRoles
     * @summary List roles
     * @request GET:/roles
     * @secure
     */
    getRoles: (
      query?: {
        /** Filter by type (system/custom) */
        type?: "system" | "custom";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object[];
        },
        any
      >({
        path: `/roles`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name CreateRole
     * @summary Create role
     * @request POST:/roles
     * @secure
     */
    createRole: (data: object, params: RequestParams = {}) =>
      this.request<object, void>({
        path: `/roles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name GetRole
     * @summary Get role details
     * @request GET:/roles/{id}
     * @secure
     */
    getRole: (id: string, params: RequestParams = {}) =>
      this.request<object, void>({
        path: `/roles/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name UpdateRole
     * @summary Update role
     * @request PUT:/roles/{id}
     * @secure
     */
    updateRole: (id: string, data: object, params: RequestParams = {}) =>
      this.request<object, void>({
        path: `/roles/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name DeleteRole
     * @summary Delete role
     * @request DELETE:/roles/{id}
     * @secure
     */
    deleteRole: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
        },
        void
      >({
        path: `/roles/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tenant = {
    /**
     * No description
     *
     * @tags Tenant
     * @name GetTenant
     * @summary Get current tenant
     * @request GET:/tenant
     * @secure
     */
    getTenant: (params: RequestParams = {}) =>
      this.request<
        {
          data?: {
            /** @example "my-org" */
            id?: string;
            /** @example "My Organization" */
            name?: string;
            /** @example "MYORG" */
            short_name?: string;
            /** @example "organization" */
            type?: string;
            /** @example "active" */
            status?: string;
            /** @example "my-org" */
            subdomain_preference?: string;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            subdomain_activated_at?: string;
            /** @example true */
            is_on_trial?: boolean;
            /**
             * @format date-time
             * @example "2023-11-03T10:00:00.000000Z"
             */
            trial_ends_at?: string;
            domains?: string[];
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
          };
        },
        any
      >({
        path: `/tenant`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenant
     * @name UpdateTenant
     * @summary Update current tenant
     * @request PUT:/tenant
     * @secure
     */
    updateTenant: (
      data: {
        /** @example "Acme Corp" */
        name?: string;
        /** @example "ACME" */
        short_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: {
            /** @example "my-org" */
            id?: string;
            /** @example "My Organization" */
            name?: string;
            /** @example "MYORG" */
            short_name?: string;
            /** @example "organization" */
            type?: string;
            /** @example "active" */
            status?: string;
            /** @example "my-org" */
            subdomain_preference?: string;
            /**
             * @format date-time
             * @example "2023-10-27T10:00:00.000000Z"
             */
            subdomain_activated_at?: string;
            /** @example true */
            is_on_trial?: boolean;
            /**
             * @format date-time
             * @example "2023-11-03T10:00:00.000000Z"
             */
            trial_ends_at?: string;
            domains?: string[];
            /** @example "https://example.com/logo.png" */
            logo_url?: string;
          };
        },
        any
      >({
        path: `/tenant`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  activities = {
    /**
     * @description Get a paginated list of user activities
     *
     * @tags Activities
     * @name GetActivities
     * @summary List all activities
     * @request GET:/activities
     * @secure
     */
    getActivities: (
      query?: {
        /**
         * Items per page
         * @default 20
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object[];
          meta?: object;
        },
        void
      >({
        path: `/activities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name GetActivity
     * @summary Get activity details
     * @request GET:/activities/{id}
     * @secure
     */
    getActivity: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object;
        },
        void
      >({
        path: `/activities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name GetUserActivities
     * @summary Get user activities
     * @request GET:/activities/user/{userId}
     * @secure
     */
    getUserActivities: (userId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object[];
        },
        any
      >({
        path: `/activities/user/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name ExportActivities
     * @summary Export activities
     * @request GET:/activities/export
     * @secure
     */
    exportActivities: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          data?: object;
        },
        any
      >({
        path: `/activities/export`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  sessions = {
    /**
     * No description
     *
     * @tags Sessions
     * @name GetSessions
     * @summary List active sessions
     * @request GET:/sessions
     * @secure
     */
    getSessions: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object[];
          meta?: object;
        },
        any
      >({
        path: `/sessions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sessions
     * @name GetActiveSessions
     * @summary Get active sessions
     * @request GET:/sessions/active
     * @secure
     */
    getActiveSessions: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: object[];
          meta?: object;
        },
        any
      >({
        path: `/sessions/active`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sessions
     * @name TerminateSession
     * @summary Terminate session
     * @request POST:/sessions/{id}/terminate
     * @secure
     */
    terminateSession: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          message?: string;
          data?: object;
        },
        any
      >({
        path: `/sessions/${id}/terminate`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
