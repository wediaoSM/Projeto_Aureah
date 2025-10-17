export default function LoadingSpinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-2 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    </div>
  );
}

export function PulseRingLoader({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
      <div className="absolute w-8 h-8 bg-purple-500 rounded-full pulse-ring"></div>
      <div className="absolute w-8 h-8 bg-purple-500 rounded-full pulse-ring" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}

export function WaveformLoader({ className = '' }) {
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-purple-500 rounded-full waveform-bar"
          style={{
            height: '20px',
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}