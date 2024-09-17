import { useState, useEffect } from "react";
import "./App.css";
import Lottie from "lottie-react";
import NotFoundIcon from "./assets/lottiefiles/not_found.json";
import ContactBookCreateModal from './components/ContactBookCreateModal'
function App() {
  const [contactBookList, setContactBookList] = useState([]);
  const handleContactBook = async () => {
    try {
      const response = await fetch(
        "https://django-nikhil-api.vercel.app/api/contact_book"
      );
      const data = await response.json();
      setContactBookList(data);
    } catch (error) {
      console.error("Error fetching contact book data", error);
    }
  };

  useEffect(() => {
    handleContactBook();
  }, []);

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
                  <button className="btn btn-primary btn-floating" onClick={()=> new mdb.Modal(document.querySelector('#contactBookCreateModal')).show()}>
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
                    {contactBookList.length ? (
                      contactBookList.map((value, index) => {
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
                                <button className="btn btn-danger btn-sm">
                                  Delete
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
    </>
  );
}

export default App;
