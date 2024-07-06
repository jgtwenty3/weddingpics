
import { Link, useNavigate } from "react-router-dom";




const Topbar = () => {
  const navigate = useNavigate();


  return (
    <section className="topbar">
      <div className="flex-center">
        <Link to="/">
        <h1 className = "font-cursive text-xl p-5">Mr. and Mrs. Justin and Lindsey Guerrero</h1>
        </Link>
       
      </div>
    </section>
  );
};

export default Topbar;