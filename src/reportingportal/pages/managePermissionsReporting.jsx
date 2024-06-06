import CorpSelectLayout from "../global/templates/corpSelectLayout";
import ManagePermissionsIndex from "../modules/managePermissions/managePermissionsIndex";

const ManagePermissionsReporting = () => {
  console.log({ contacts: process.env.NODE_ENV });
  return (
    <CorpSelectLayout>
      <ManagePermissionsIndex />
    </CorpSelectLayout>
  );
};
export default ManagePermissionsReporting;
