export default function BlogSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Skeleton para el título */}
      <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-6"></div>
      
      {/* Skeleton para el contenido */}
      <div className="space-y-4">
        {/* Párrafos */}
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        
        {/* Espacio para imagen */}
        <div className="h-64 bg-gray-200 rounded-md w-full my-6"></div>
        
        {/* Más párrafos */}
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        
        {/* Subtítulo */}
        <div className="h-6 bg-gray-200 rounded-md w-1/2 mt-8 mb-4"></div>
        
        {/* Párrafos finales */}
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
      </div>
    </div>
  );
}