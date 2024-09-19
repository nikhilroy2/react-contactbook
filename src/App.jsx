import { useState, useEffect } from "react";
import "./App.css";
import Lottie from "lottie-react";
import NotFoundIcon from "./assets/lottiefiles/not_found.json";
import ContactBookCreateModal from "./components/ContactBookCreateModal";
import { useSelector, useDispatch } from "react-redux";
import { isContactBookModal } from "./redux/slice/contactBookSlice";
import { contactBookList } from "./redux/slice/contactBookListSlice";
import ContactBookEditModal from "./components/ContactBookEditModal";
import LoginModal from "./components/LoginModal";
import { isLoginNow } from "./redux/slice/loginSlice";
function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state=> state.auth_login.value)
  // const [contactBookList, setContactBookList] = useState([]);
  const [contactBookPut, setContactBookPut] = useState([]);
  const contact_book_list = useSelector(
    (state) => state.contact_book_list.value
  );
  const handleContactBook = async () => {
    try {
      const response = await fetch(
        "https://django-nikhil-api.vercel.app/api/contact_book"
      );
      const data = await response.json();
      dispatch(contactBookList(data));
    } catch (error) {
      console.error("Error fetching contact book data", error);
    }
  };

  

  useEffect(() => {
    handleContactBook();
    // open login modal
    new mdb.Modal(document.querySelector('#loginModal')).show() // show modal
  }, []);

  const handleModalOpen = () => {
    dispatch(isContactBookModal(true));
    new mdb.Modal(document.querySelector("#contactBookCreateModal")).show();
  };

  const handleDelete = async (contact_book_id) => {
    try {
      const response = await fetch(
        `https://django-nikhil-api.vercel.app/api/contact_book/${contact_book_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching contact book data", error);
    }
  };

  const handleEdit = (contact_book_id)=> {
    setContactBookPut(contact_book_list.filter(value=> value.contact_book_id === contact_book_id)[0]);
    new mdb.Modal(document.querySelector("#contactBookEditModal")).show();
  }
  

  return (
    <>
      <section className="py-3 py-md-5 bg-primary bg-opacity-25">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="row align-items-center g-2 justify-content-center">
                <div className="col-auto">
                  <h2 className="text-center mb-0">Contact Book</h2>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-primary btn-floating"
                    onClick={() => handleModalOpen()}
                  >
                    <i className="fa fa-plus fs-6" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-danger">
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact_book_list.length ? (
                      contact_book_list.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.phone}</td>
                            <td>{value.email}</td>
                            <td>{value.location}</td>
                            <td>
                              <div className="btn-group btn-">
                                <button className="btn btn-primary btn-sm">
                                  Show
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete(value.contact_book_id)
                                  }
                                  className="btn btn-danger btn-sm"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() =>
                                    handleEdit(value.contact_book_id)
                                  }
                                  className="btn btn-info btn sm"
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5}>
                          <Lottie
                            style={{ height: "100px" }}
                            animationData={NotFoundIcon}
                            loop={true}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========Modal Import========= */}
      <ContactBookCreateModal></ContactBookCreateModal>
      <ContactBookEditModal contactBookPut={contactBookPut}></ContactBookEditModal>
      {loggedUser ? "" : <LoginModal></LoginModal>}
      
    </>
  );
}

export default App;
