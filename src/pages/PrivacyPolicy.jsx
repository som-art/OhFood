import React from "react";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const history = useHistory();

  return (
    <>
      <div className=" bg-white pb-40">
        <Navbar />
        <div className=" bg-slate-200">
          <div className=" text-center w-screen h-auto text-lg text-black pt-28 hover:cursor-pointer font-light">
              <span onClick = {() => { history.push("/")}}>Home /</span><span onClick = {() => { history.push("/privacy-policy")}}> Privacy Policy</span>
            </div> 
          <div className="text-center w-screen h-auto text-5xl text-black mt-6 font-black pb-12">
            Privacy Policy
          </div>
        </div>
        <div className="flex flex-col justify-center h-auto m-20">
          <p className="text-xl fontOswald text-left text-slate-600 mb-5 font-light">
            We are very delighted that you have shown interest in our enterprise. 
            Data protection is of a particularly high priority for the management of the Company Name. 
            The use of the Internet pages of the Company Name is possible without any indication of personal data; 
            however, if a data subject wants to use special enterprise services via our website, processing of 
            personal data could become necessary. If the processing of personal data is necessary and there is no 
            statutory basis for such processing, we generally obtain consent from the data subject.</p>

          <p className="text-xl fontOswald text-left text-slate-600 mb-5 font-light">
            The processing of personal data, such as the name, address, e-mail address, or telephone number 
            of a data subject shall always be in line with the General Data Protection Regulation (GDPR), and 
            in accordance with the country-specific data protection regulations applicable to the Company Name. 
            By means of this data protection declaration, our enterprise would like to inform the general public
            of the nature, scope, and purpose of the personal data we collect, use and process. Furthermore,
            data subjects are informed, by means of this data protection declaration, of the rights to which 
            they are entitled.
            </p>
          <p className="text-xl fontOswald text-left text-slate-600 mb-5 font-light">
            As the controller, the Company Name has implemented numerous technical and organizational measures 
            to ensure the most complete protection of personal data processed through this website. However, 
            Internet-based data transmissions may in principle have security gaps, so absolute protection may 
            not be guaranteed. For this reason, every data subject is free to transfer personal data to us via 
            alternative means, e.g. by telephone.
            </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
