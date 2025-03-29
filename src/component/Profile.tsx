import Image from "next/image";
import Link from "next/link";
import { Github, Facebook } from 'lucide-react';

export default async function Profile() {
    const issues = await fetch(`https://api.github.com/repos/${process.env.USER_GITHUB}/${process.env.REPO_GITHUB}/issues`).then(res => res.json());

    if (issues.length === 0) {
        return <h1 className="text-center mt-6 text-xl">Crea un ISSUES al menos para mostrar tu perfil</h1>;
    }

    const user = issues[0].user;
    
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-14 p-6 items-center text-center md:text-left">
            <div>
                <Image 
                    src={user.avatar_url} 
                    alt={user.login} 
                    width={300} height={300} 
                    className="rounded-full"
                />
            </div>
            <div>
                <h2 className="text-xl md:text-[30px] font-medium">{user.login}</h2>
                <h1 className="text-2xl md:text-[40px] font-bold">
                    Full Stack Developer | Pentester | Security Engineer Student
                </h1>
                <div className="flex justify-center md:justify-start gap-4 mt-4">
                    <Link className="bg-black p-3 md:p-4 rounded-full text-white" href={user.html_url} target="_blank">
                        <Github size={30} />
                    </Link>
                    <Link className="bg-black p-3 md:p-4 rounded-full text-white" href={user.html_url} target="_blank">
                        <Facebook size={30} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
