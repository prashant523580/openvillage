import Link from "next/link";

export const LinkButton = ({href,title} :{href: string, title: string}) =>    <Link href={href} className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md">
{title}
</Link>