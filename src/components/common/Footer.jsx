import React from "react";
// import {FooterLink2} from "../../data/footer-links"
import { Link } from "react-router-dom";

// Images

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code Challanges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid membership", "For Students", "Business Solutions"];
const Comunity = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="   mx-auto">
      <div className="w-11/12 mx-auto flex flex-col gap-8 items-center justify-center md:justify-between max-w-maxContent text-richblack-900 leading-6 relative py-14">
        {/* Main Footer */}
        <div className="border-b w-[100%]  flex flex-col md:flex-row  md:justify-evenly pb-10 md:pb-8 border-richblack-700 text-white ">
          {/* Section 1 */}
          <div className="flex text-center justify-between md:justify-evenly md:border-r border-richblack-700 w-[100%] md:w-[50%] mb-[5rem] md:mb-10">
            {/* Sub Section 1 */}
            <div className="flex flex-col gap-y-2">
              <h1 className=" font-semibold text-xl">StudyNotion</h1>
              <p className="text-blue-25 font-semibold text-md">Company</p>
              <p className="text-richblue-200 text-sm">About</p>
              <p className="text-richblue-200 text-sm">Careers</p>
              <div>
                <p className="text-richblue-200 text-sm">Affiliates</p>
                <img src={FaFacebook} alt="" />
                <img src={FaGoogle} alt="" />
                <img src={FaTwitter} alt="" />
                <img src={FaYoutube} alt="" />
              </div>
              <div className="flex flex-col gap-y-2 ">
                <p className="text-blue-25 font-semibold text-md">Support</p>
                <p className="text-richblue-200 text-sm">Help Center</p>
              </div>
            </div>
            {/* Subsection 2 */}
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2">
                <p className="text-blue-25 font-semibold text-md">Resources</p>
                <p className="text-richblue-200 text-sm">Articles</p>
                <p className="text-richblue-200 text-sm">Blog</p>
                <p className="text-richblue-200 text-sm">Chart Sheet</p>
                <p className="text-richblue-200 text-sm">Code Challanges</p>
                <p className="text-richblue-200 text-sm">Docs</p>
                <p className="text-richblue-200 text-sm">Projects</p>
                <p className="text-richblue-200 text-sm">Videos</p>
                <p className="text-richblue-200 text-sm">Workshop</p>
              </div>

            </div>
            {/*sub section 3 */}
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2 ">
                <p className="text-blue-25 font-semibold text-md">Plans</p>
                <p className="text-richblue-200 text-sm">Paid Memberships</p>
                <p className="text-richblue-200 text-sm">For Students</p>
                <p className="text-richblue-200 text-sm"> Business Solutions</p>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <p className="text-blue-25 font-semibold text-md">Community</p>
                <p className="text-richblue-200 text-sm">Forums</p>
                <p className="text-richblue-200 text-sm">Chapters</p>
                <p className="text-richblue-200 text-sm">Events</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex text-center justify-between md:justify-evenly  w-[100%] md:w-[50%] ">
            {/* subsection 1 */}
            <div className="flex flex-col gap-y-2">
              <p className="text-blue-25 font-semibold text-md">Subjects</p>
              <p className="text-richblue-200 text-sm">AI</p>
              <p className="text-richblue-200 text-sm">Cloud Computing</p>
              <p className="text-richblue-200 text-sm">Code Foundation</p>
              <p className="text-richblue-200 text-sm">Computer Science</p>
              <p className="text-richblue-200 text-sm">cybersecurity</p>
              <p className="text-richblue-200 text-sm">Data Analytics</p>
              <p className="text-richblue-200 text-sm">Data Science</p>
              <p className="text-richblue-200 text-sm">Data Visualization</p>
              <p className="text-richblue-200 text-sm">Developer Tools</p>
              <p className="text-richblue-200 text-sm">DevOps</p>
              <p className="text-richblue-200 text-sm">Game Development</p>
              <p className="text-richblue-200 text-sm">IT</p>
              <p className="text-richblue-200 text-sm">Machine Learning</p>
              <p className="text-richblue-200 text-sm">Math</p>
              <p className="text-richblue-200 text-sm">Mobile Development</p>
              <p className="text-richblue-200 text-sm">Web Design</p>
              <p className="text-richblue-200 text-sm">Web Development</p>
            </div>
            {/* subsection 2 */}
            <div className="flex flex-col gap-y-2">
              <p className="text-blue-25 font-semibold text-md">Languages</p>
              <p className="text-richblue-200 text-sm">Bash</p>
              <p className="text-richblue-200 text-sm">C++</p>
              <p className="text-richblue-200 text-sm">C#</p>
              <p className="text-richblue-200 text-sm">Go</p>
              <p className="text-richblue-200 text-sm">HTML & CSS</p>
              <p className="text-richblue-200 text-sm">Java</p>
              <p className="text-richblue-200 text-sm">Javascript</p>
              <p className="text-richblue-200 text-sm">Kotlin</p>
              <p className="text-richblue-200 text-sm">PHP</p>
              <p className="text-richblue-200 text-sm">Python</p>
              <p className="text-richblue-200 text-sm">R</p>
              <p className="text-richblue-200 text-sm">Ruby</p>
              <p className="text-richblue-200 text-sm">SQL</p>
              <p className="text-richblue-200 text-sm">Swift</p>
            </div>
            {/* subsection 3 */}
            <div className="flex flex-col gap-y-2">
              <p className="text-blue-25 font-semibold text-md">
                Carrer Building
              </p>
              <p className="text-richblue-200 text-sm">Carrer Path</p>
              <p className="text-richblue-200 text-sm">Carrer Services</p>
              <p className="text-richblue-200 text-sm">Interview Prep</p>
              <p className="text-richblue-200 text-sm">
                Professional Certification
              </p>
              <p className="text-richblue-200 text-sm">Full Catalog</p>
              <p className="text-richblue-200 text-sm">Beta Content</p>
            </div>
          </div>
        </div>

        {/* Extended Footer */}
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-900 leading-6 mx-auto relative">
          <div className="flex gap-5">
            <p className="text-richblue-200 text-sm">Privacy Policy</p>
            <p className="text-richblue-200 text-sm">Cookie Policy</p>
            <p className="text-richblue-200 text-sm">Terms</p>
          </div>
          <div>
            <p className="text-richblue-200 text-sm">
              Made with <span className="w-[20px]">❤️</span> by Ayushmaan Gupta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
