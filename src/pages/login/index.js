import { useState } from "react";
import useApi from "../../hooks/useApi";
import { connect, useDispatch } from "react-redux";
import { SET_TOKEN } from "../../store/reducers/authReuducer";

const Login = (props) => {
   console.log(">>LOGIN PAGE PROPS", props);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const api = useApi();
   const dispatch = useDispatch();

   const onLoginBtnClick = () => {
      const postData = {
         email,
         password,
      };
      console.log(">>POST DATA", postData);

      api.post("auth/login", postData)
         .then((response) => {
            console.log(">>RES", response);
            console.log(">>TOKEN", response.data.data.token);

            if (response.data.status === "success") {
               localStorage.setItem("token", response.data.data.token);

               const action = {
                  type: SET_TOKEN,
                  payload: {
                     token: response.data.data.token,
                  },
               };

               props.dispatch(action);

               dispatch(action);

               window.location.href = "/#";
            } else {
               alert("hatalı eposta veya şifre girildi");
            }
         })
         .catch((err) => {
            console.log(">>ERR", err);
            alert(err.response.data.errorMessage);
         });
   };

   return (
      <main>
         <div className="col-6 text-center">
            <label
               for="email"
               className="form-label"
               style={{ fontSize: "20px", fontWeight: "bold" }}
            >
               Email
            </label>
            <input
               type="email"
               className="form-control"
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>
         <div className="col-6 text-center mt-3">
            <label
               for="email"
               className="form-label"
               style={{ fontSize: "20px", fontWeight: "bold" }}
            >
               password
            </label>
            <input
               type="password"
               className="form-control"
               placeholder="password"
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>
         <div className="col-3 mt-5">
            <div className="d-grid gap-2">
               <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onLoginBtnClick}
               >
                  Login
               </button>
            </div>
         </div>
      </main>
   );
};

const mapStateToProps = (state) => {
   console.log(">>LOGIN MAP STATE", state);

   return {
      ...state,
   };
};

export default connect(mapStateToProps)(Login);
