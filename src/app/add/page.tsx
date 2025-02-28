import { addToWatchList } from "@/action";
import MediaForm from "@/components/MediaForm";

export default function AddToWatchList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add to Watch List</h1>
      <MediaForm action={addToWatchList} withType={true} />
    </div>
  );
}
