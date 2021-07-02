import axios from 'axios';

const ADMIN_GET_ALLADMINS = "http://localhost:8081/api/osm/admin/show-all";
const ADMIN_GET_ADMIN_BY_ID = "http://localhost:8081/api/osm/admin/show";
const ADMIN_DELETE_ADMIN = "http://localhost:8081/api/osm/admin/cancel";
const ADMIN_ADD_ADMIN = "http://localhost:8081/api/osm/admin/add";
const ADMIN_UPDATE_ADMIN = "http://localhost:8081/api/osm/admin/update";

class AdminService {
    
    getAdmin() {
        return axios.get(ADMIN_GET_ALLADMINS);
    }

    getById(adminId) {
        console.log("Axios one id:"+adminId);
        return axios.get(ADMIN_GET_ADMIN_BY_ID + '/' + adminId);
    }

    deleteAdmin(AdminId) { 
        console.log("delete service");
        return axios.delete(ADMIN_DELETE_ADMIN + '/' + AdminId);
    }

    createAdmin(Admin) {
        console.log("update");
        return axios.post(ADMIN_ADD_ADMIN, Admin);
    }

    updateAdmin(Admin, AdminId) {
        console.log("came to axios update: "+AdminId);
        return axios.put(ADMIN_UPDATE_ADMIN + '/' + AdminId, Admin);
        
    }
}
export default new AdminService()