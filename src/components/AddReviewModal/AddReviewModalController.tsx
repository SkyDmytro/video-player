import { Star } from "lucide-react";
import { useState } from "react";
import { store } from "../../stores/VideoStore";

export const AddReviewModal = ({
  isOpen,
  closeDialog,
  videoId,
}: {
  isOpen: boolean;
  closeDialog: () => void;
  videoId: string;
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  if (!isOpen) return null;
  const { addReview } = store;
  const video = store.videos.find((v) => v.id === videoId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview(videoId, rating, comment);
    setComment("");
    closeDialog();
  };

  return (
    <div
      className={`fixed inset-0 bg-background  backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-backgroundColor text-text rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all duration-300 ease-in-out">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-text">Add Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-text mb-1"
                htmlFor="comment"
              >
                Comment
              </label>
              <textarea
                id="comment"
                className="w-full px-3 py-2 text-text border rounded-lg focus:outline-none focus:border-button transition-colors duration-200"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-text bg-button/50 rounded-md hover:bg-button/75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button transition-colors duration-200"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-text bg-button rounded-md hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4 max-h-60 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2 text-text">Reviews</h3>
          {video?.reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-4 w-4 ${
                      value <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
