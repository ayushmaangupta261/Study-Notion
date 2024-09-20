
const Category = require("../models/Category");

// create category handler function
exports.createCategory = async (req, res) => {

    try {
        console.log("In the try of create category")

        // fetch data
        const { name, description } = req.body;

        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: true,
                message: "All  fields are required",
            })
        }
        // create entry in db
        console.log("Creating category...")
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}


// Get all category handler
exports.showAllCategory = async (req, res) => {

    try {
        // console.log("Show alll category")
        const allCategory = await Category.find({}, { name: true, description: true }); //It will give all the tags and should maintain that name and description is present
        // console.log("All category -> ", allCategory)
        return res.status(200).json({
            success: true,
            message: "All csategories are returned successfully",
            data: allCategory
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}



// category page details
exports.categoryPageDeatils = async (req, res) => {

    try {
        const { categoryId } = req.body;

        // get courses forthe specified category
        const selectedCategory = await Category.findById(categoryId).populate(
            {
                path: "course",
                // match: { status: "Published" },
                populate: "ratingAndReviews",

                // populate:
                // {
                //     path: "instructor",
                //     model: "User"
                // },
                populate:{
                    path:"category",
                    model:"Category"
                }


            }
        ).exec();

        console.log("Selected Category -> ", selectedCategory);

        // handle the case when category is not found
        if (!selectedCategory) {
            console.log("Courses not found...");
            return res.status(404).json({
                success: false,
                message: "Courses not found..."
            });
        }

        // Handle the case when there are no courses
        if (selectedCategory.course.length === 0) {
            console.log("No course in found in the selected category...");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category..."
            });
        }


        const selectedCourses = selectedCategory.course;

        // get courses for other category
        // const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } }).populate("courses"); // $ne : means all elements other than the given id

        // let differentCourses = [];
        // for (const category of categoriesExceptSelected) {
        //     differentCourses.push(...category.courses);
        // }
        // let differentCategory = await category.findOne(
        //     categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        // ).populate({
        //     path: "courses",
        //     match: { status: "Published" }
        // }).exec();



        // get top selling courses across all category
        // const allCategories = await Category.find().populate({
        //     path: "course",
        //     // match: { status: "Published" },
        //     populate: {
        //         path: "instructor",
        //     }
        // });
        // const allCourses = allCategories.flatMap((category) => category.course);
        // const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10); // first 10

        return res.status(200).json({
            success: true,
            data: {
                selectedCourses: selectedCourses,
                // differentCourses: differentCourses,
                // mostSellingCourses: mostSellingCourses,
            }
        });

    }

    catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message,
        });

    }
}