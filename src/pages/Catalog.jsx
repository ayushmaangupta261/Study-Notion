import React, { useEffect, useState } from 'react'
import Footer from "../components/common/Footer"
import { useParams } from 'react-router-dom'
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/api";
// import { getCatalogPageData } from "../services/operations/PageAndComponentData.js"
import PageAndComponentData from '../services/operations/PageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { Link } from 'react-router-dom';


const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    // Fertch all categories
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            console.log("Fetching catalog data")
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("response from catalog -> ", res);
            // const category_id = res?.data?.toString().filter((ct) => ct.name.split(" ").join("-").toLowerCase() === CatalogName)[0];
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            console.log("Category id  found in catalog -> ", category_id);
            setCategoryId(category_id);
            console.log("Category id in catalog -> ", categoryId);
            setLoading(false);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            setLoading(true);
            try {
                console.log("Going to fetch page and component data")
                const res = await PageAndComponentData(categoryId);
                console.log("Fetched page and component data -> ", res.data.selectedCourses);
                setCatalogPageData(res?.data?.selectedCourses);
                console.log("Catalog page data -> ", catalogPageData);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }

        if (categoryId) {
            getCategoryDetails();
        }

    }, [categoryId]);


    return (
        <div className='text-white  w-11/12 mx-auto mt-5'>

            {
                catalogPageData.length == 0 ?
                    (
                        <div>
                            <p className='text-4xl text-center text-richblack-5'>No Courses were found</p>
                        </div>
                    )
                    :
                    (<div></div>)
            }

            {
                loading === false ?
                    (<div className='h-full'>
                        <div className='flex flex-col'>

                            <div className='text-richblack-5'>
                                <p className='text-lg  '>{`Home / Catalog / `}
                                    <span>{catalogPageData?.[0]?.category?.name}</span>
                                </p>
                                <p className='text-xl mt-5 '>{catalogPageData?.[0]?.category?.name}</p>
                                <p className='text-lg mt-1 '>{catalogPageData?.[0]?.category?.description}</p>
                            </div>
                            {/* 
                            <div className='mt-10 mb-10 grid grid-cols-1 min-[920px]:grid-cols-2 lg:grid-cols-3 ' >
                                {
                                    catalogPageData?.map((course, index) => (



                                        <div className=' w-[90%] flex flex-col  min-[710px]:flex-row min-[920px]:flex-col py-5 mt-3 justify-center items-center bg-richblack-700 text-richblack-5 rounded-lg hover:scale-105 transition-all duration-300 group mx-auto'>

                                            {/* <div>{course?.thumbnail}</div> */}
                            {/* <img src={`${course?.thumbnail}`} alt=" " className='w-[250px] rounded-lg m-2 shadow' />
                                            <Link to={`{/courses/${course._id}}`}>
                                                <div className='flex flex-col justify-center min-[920px]:items-center max-[920px]:ml-5'>
                                                    <p className='text-xl mt-2'> {course?.courseName}</p>
                                                    <p className='text-md '> {course?.courseDescription}</p> */}

                            {/* <p className='text-md' > <span>Instructor : </span> {course?.instructor?.firstName} {course?.instructor?.lastName}</p> */}
                            {/* </div> */}

                            {/* </Link> */}

                            {/* </div> */}

                            {/* )) */}
                            {/* } */}
                            {/* </div> */}

                        </div>

                        <div className='mt-10 mb-10'>
                            {/* Section 1 */}
                            <div className='text-richblack-5'>
                                <div className='ml-1'>Courses to get you started</div>
                                <div className='flex flex-row w-[200px] justify-between mt-3 bg-richblack-800 px-2 py-3 rounded-lg'>
                                    {/* Make these two buttons */}
                                    <p className="bg-richblack-700 rounded-lg px-3 py-2">Most Popular</p>
                                    <p className='bg-richblack-700 rounded-lg px-3 py-2'>New</p>
                                </div>
                                <div className='mt-5 '>
                                    <CourseSlider Courses={catalogPageData} />
                                </div>
                            </div>

                            {/* Section 2 */}
                            {/* <div>
                                <p>Top Courses in <span>{catalogPageData?.data?.selectedCategory?.name}</span> </p>
                                <div>
                                    <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
                                </div>
                            </div>

                            {/* Section 3 */}
                            {/* <div>
                                <div>Frequently Bought Together</div>
                                <div className='py-8'>

                                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                                        {
                                            catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => {
                                                <Course_Card course={course} key={index} Height={"h-[400px]"} />
                                            })
                                        }
                                    </div>

                                </div>
                            </div>  */}

                        </div>

                        <Footer />
                    </div>)
                    :
                    (
                        <div className='h-[100vh] flex justify-center items-center'>
                            <div class="loadcata">
                                <span class="loadcata-text text-3xl text-center">Loading...</span>
                                <span class="load"></span>
                            </div>
                        </div>
                    )
            }

        </div>
    )
}

export default Catalog
