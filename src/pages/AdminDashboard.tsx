import admindashboard from "../assets/admindashboard.jpeg";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto mt-4 flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-yellow-600">
          Velkommen til din admin bruger
        </h1>
        <span className="text-xl">
          Her kan du styre administration af din profil, begivenheder, de
          registrerede brugere og galleri
        </span>
      </div>
      <div className="grid md:grid-cols-1 gap-5">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img
            src={admindashboard}
            alt="Admin Dashboard"
            className="w-full max-h-[300px] object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
