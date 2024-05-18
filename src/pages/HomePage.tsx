const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5xl font-bold tracking-tight text-yellow-600">DJ Nosework</h1>
            <span className="text-xl">Bliv en del af fælleskabet!</span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Nosework er en sjov og udfordrende sport for dig og din hund!
                </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Oplev en ny verden med din dejlige hund!
                </span>
            </div>
        </div>
    </div>
  )
}

export default HomePage;