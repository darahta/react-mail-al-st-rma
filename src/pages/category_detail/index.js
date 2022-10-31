import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import ServiceBox from "./components/service_box";

const CategoryDetail = () => {
   const params = useParams();
   console.log(">>PARAMS", params);
   const api = useApi();

   const [CategoryDetails, setCategoryDetails] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      api.get(`public/categories/getBySlug/${params.slug}`)
         .then((response) => {
            console.log(">>cat detail", response.data.data);
            setCategoryDetails(response.data.data);
            setLoading(false);
         })
         .catch((err) => {
            console.log(">>err", err);
         });
   }, []);

   return (
      <div>
         {loading ? (
            <img src="loading.gif" />
         ) : (
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
               {CategoryDetail.service.map((service) => {
                  return <ServiceBox key={service.id} serviceProp={service} />;
               })}
            </div>
         )}
      </div>
   );
};

export default CategoryDetail;
