import Link from "next/link";

function Logo() {
  return (
    <>
      <div className="absolute top-4 left-4">
        <Link href="/">
          <p className="text-white">Workflow Create</p>
        </Link>
      </div>
    </>
  );
}

export default Logo;
