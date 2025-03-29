import Link from "next/link";

export default async function GetBlogs() {
  const blogs = await fetch(`https://api.github.com/repos/${process.env.USER_GITHUB}/${process.env.REPO_GITHUB}/issues`).then(res => res.json());

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-wrap px-4 sm:px-8">
      {blogs.map((blog: any) => (
        <Link key={blog.number} href={`/${blog.number}`} className="w-full">
          <div className="bg-[#eaeaea] hover:bg-[#121212] hover:text-white w-full max-w-[300px] mx-auto py-4 px-6 rounded-md font-medium hover:font-bold transition duration-300 
          flex flex-col justify-between h-full min-h-[180px]">
            <p className="text-[20px] ">{blog.title}</p>

            {/* Etiquetas */}
            <div className="flex flex-wrap gap-1 mt-2">
              {blog.labels.map((label: any) => (
                <span
                  key={label.id}
                  className="px-2 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </span>
              ))}
            </div>

            {/* Usuario y fecha */}
            <label className="text-[14px] block mt-auto">{blog.user.login}, {blog.created_at.split('T')[0]}</label>
          </div>
        </Link>
      ))}
    </div>
  );
}
