const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-cyan-400 border-solid h-12 w-12" />
    </div>
  );
};

export default LoadingSpinner;
