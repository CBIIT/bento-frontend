const styles = () => ({
  fileUploader: {
    width: '100%',
    height: '35px',
    display: 'flex',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },
  uploaderComponent: {
    height: '38px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '22px',
  },
  fileName: {
    marginLeft: '101px',
    alignSelf: 'center',
  },
  uploadInput: {
    opacity: 0,
    zIndex: 4,
    width: '96px',
    height: '35px',
    position: 'absolute',
  },
  uploadButton: {
    zIndex: 1,
    color: 'white',
    position: 'absolute',
    backgroundColor: 'blue',
    marginBottom: '12px',
    width: 143,
    boxShadow: 'none',
  },
});

export default styles;
