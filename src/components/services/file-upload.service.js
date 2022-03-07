import axios from "axios";

class FileUploadService {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
}
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id);
  }
}

export default new FileUploadService();