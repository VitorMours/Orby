import Navbar from "@/components/Navbar/Navbar";

export default function Home() {


  return (
    <main>
      <section id="hero" className="flex mx-auto hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col flex-1 lg:flex-row gap-10  min-h-screen bg-[radial-gradient(circle,#757575_1px,transparent_1px)] bg-[size:15px_15px]">
          <div className="">
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-6xl font-bold">
                Centralize sua vida
              </h1>
              <p className="italic">
                Todas as suas necessidades, em um só lugar
              </p>
              <button
                className="btn btn-neutral transition-all duration-300 hover:scale-101 hover:bg-neutral/20 hover:text-neutral"
              >
                Centralize agora
              </button>
            </div>
          </div>
        </div>
        <div className="bg-background-black flex-1 min-h-screen bg-blue-500">
          video da funcionalidade cantando solto
        </div>
      </section>

      <section>
      </section>
      <section id="features">
        asd
      </section>
      <section id="about">

      </section>
    </main>
  );
}
