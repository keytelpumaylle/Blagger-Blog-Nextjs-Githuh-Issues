import GetBlogs from "@/component/GetBlogs";
import Profile from "@/component/Profile";

export default function Home() {
  return (
    <div className="min-h-screen p-4 bg-[#f8f8f8]">
      <Profile/>
      <GetBlogs/>
    </div>
  )
  
}
