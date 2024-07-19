import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../actions/cartAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { Country, State } from "country-state-city";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <>
      <div className=" bg-white pb-40">
        <Navbar /> 

        <CheckoutSteps activeStep={0} className=" mt-40"/>
            <h2 className="text-center w-screen h-auto text-5xl text-black mt-6 font-bold mb-12">Shipping Details</h2>

            <form
              className=" flex flex-col h-auto w-screen justify-center items-center"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div>
                <Input
                  type="text"
                  label="Address"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="City"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Pin Code"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Phone Number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </div>

              <div>
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={" border-2 border-slate-200 h-12 md:w-[500px] pl-3 mt-2 mb-5 w-[300px]"}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={" border-2 border-slate-200 h-12 md:w-[500px] pl-3 mt-2 mb-5 w-[300px]"}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <Button
                text="CONTINUE"
                value="Continue"
                className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
                disabled={state ? false : true}
              />
            </form>
      </div> 
      <Footer /> 
    </>
  );
};

export default Shipping;