import Link from "next/link";

function Support() {
  return (
    <>
      <div className="p-8 absolute bottom-0">
        <Link href="https://www.buymeacoffee.com/jtpotato" target="_blank">
          <button
            className="text-button bg-white"
            style={{ boxShadow: "0 0 20px 5px white" }}
          >
            Buy me a bubble tea 🧋
          </button>
        </Link>
      </div>
    </>
  );
}

export default Support;
