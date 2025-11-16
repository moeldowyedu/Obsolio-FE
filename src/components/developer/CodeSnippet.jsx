import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeSnippet = ({ code, language = 'javascript', title, showLineNumbers = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLanguageLabel = (lang) => {
    const labels = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      bash: 'Bash',
      json: 'JSON',
      curl: 'cURL',
    };
    return labels[lang] || lang;
  };

  return (
    <div className="relative group">
      {/* Header */}
      {(title || language) && (
        <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center gap-3">
            {title && <span className="text-sm font-medium">{title}</span>}
            {language && (
              <span className="px-2 py-0.5 bg-gray-700 text-xs rounded">
                {getLanguageLabel(language)}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-700 rounded transition-colors text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code Block */}
      <div className={`bg-gray-900 text-gray-100 p-4 ${title || language ? '' : 'rounded-t-lg'} rounded-b-lg overflow-x-auto`}>
        <pre className="text-sm font-mono">
          {showLineNumbers ? (
            <code>
              {code.split('\n').map((line, index) => (
                <div key={index} className="table-row">
                  <span className="table-cell pr-4 text-right text-gray-500 select-none">
                    {index + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>

      {/* Copy button (absolute, shows on hover if no header) */}
      {!title && !language && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-200" />
          )}
        </button>
      )}
    </div>
  );
};

export default CodeSnippet;
