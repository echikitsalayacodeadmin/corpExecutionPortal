import CorpSelectLayout from "../global/templates/corpSelectLayout";
import BulkUploadIndex from "../modules/bulkUpload/bulkUploadIndex";

const BulkUploadReporting = () => {
  console.log({ contacts: process.env.NODE_ENV });
  return (
    <CorpSelectLayout>
      <BulkUploadIndex />
    </CorpSelectLayout>
  );
};

export default BulkUploadReporting;
