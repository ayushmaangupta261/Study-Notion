export default function GetAvgRating(ratingArr) {
    if (ratingArr?.length === 0) return 0;

    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    }, 0);

    const multiplier = Math.pow(10, ratingArr.length); // may be i in place of 1
    const avgReviewCount = Math.round((totalReviewCount / ratingArr?.length * multiplier) / multiplier)

    return avgReviewCount

}