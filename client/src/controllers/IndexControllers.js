import axios from 'axios'

function IndexControllers() {
    var self = this;
    self.getCurrentUser = () => {
        axios.get('http://localhost:9000/api/auth/currentUser')
    }

    return self;
};

export default IndexControllers;