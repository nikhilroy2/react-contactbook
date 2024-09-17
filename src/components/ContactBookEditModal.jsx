import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isContactBookModal } from "../redux/slice/contactBookSlice";
import { appendContactBook } from "../redux/slice/contactBookListSlice";
import { editContactBook } from "../redux/slice/contactBookListSlice";
function ContactBookEditModal({contactBookPut}) {
  const dispatch = useDispatch();
  const inputName = useRef();
  const inputPhone = useRef();
  const inputEmail = useRef();
  const inputAddress = useRef();
  const handleContactBookEdit = async (event) => {
    event.preventDefault();
    // Gather the form data
    const name = inputName.current.value;
    const phone = inputPhone.current.value;
    const email = inputEmail.current.value;
    const location = inputAddress.current.value;

    // Create the payload
    const payload = {
      name,
      phone,
      email,
      location,
    };

    try {
      // Make the PUT request
      const response = await fetch(
        `https://django-nikhil-api.vercel.app/api/contact_book/${contactBookPut.contact_book_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',  // Important for sending cookies with requests
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        // console.log("Success:", data);
        dispatch(editContactBook(data))
        dispatch(isContactBookModal(false));
        document.querySelector('#contactBookEditModal .btn-close').click() // close modal
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };
  // console.log(contactBookPut)
  return (
    <div className="modal fade" id="contactBookEditModal">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleContactBookEdit}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Contact Book
            </h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-ripple-init
              data-mdb-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="form-group mb-2">
              <label htmlFor="" className="form-label text-black fw-bold">
                Name:
              </label>
              <input
                ref={inputName}
                type="text"
                required
                data-value={contactBookPut.name}
                defaultValue={contactBookPut.name}
                name="name"
                className="form-control border"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="" className="form-label text-black fw-bold">
                Phone:
              </label>
              <input
                ref={inputPhone}
                type="number"
                defaultValue={contactBookPut.phone}
                required
                name="phone"
                className="form-control border"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="" className="form-label text-black fw-bold">
                Email:
              </label>
              <input
                ref={inputEmail}
                type="email"
                defaultValue={contactBookPut.email}
                name="email"
                className="form-control border"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="" className="form-label text-black fw-bold">
                Address:
              </label>
              <textarea
                ref={inputAddress}
                defaultValue={contactBookPut.location}
                name="address"
                className="form-control border"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Update changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactBookEditModal;
