import { Link } from "react-router-dom";

const ServicesCard = ({ service }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={service.img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{service.title}</h2>
                <h2 className="card-title">{service.price}</h2>
                <div className="card-actions">
                    <Link to={`/checkout/${service._id}`} > <button className="btn btn-primary">Checkout</button> </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;