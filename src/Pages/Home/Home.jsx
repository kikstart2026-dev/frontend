import Faqs from "../../Component/Faqs/Faqs";
import faqData from "../../data/faqData";

export default function Home() {
  return (
    <div>
      <Faqs data={faqData} />
    </div>
  );
}