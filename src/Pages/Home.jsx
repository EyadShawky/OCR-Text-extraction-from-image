import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import '../styles/Home.scss';
import { Input } from 'antd';
const { TextArea } = Input;

const Home = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [extractedText, setExtractedText] = useState('');

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    // Limiting to accept only one image at a time
    const latestFile = newFileList.slice(-1);
    setFileList(latestFile);
  };

  const handleExtract = async () => {
    if (fileList.length === 0) {
      // No file selected
      return;
    }

    const formData = new FormData();
    formData.append('file', fileList[0].originFileObj);

    try {
      const response = await fetch('http://127.0.0.1:5000/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setExtractedText(data.text); // Update state with extracted text

      if (!response.ok) {
        throw new Error('Failed to extract text');
      }


    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };



  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        color: 'white'
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <div className='d-flex justify-content-center aligen-items-center'>
        <div className="card" style={{ width: '100%' }}>
          <div className="mt-4">
            <h3>Text Extractor Tool</h3>
            <p>please make sure that your file is one of these formats <br /><span>(.jpg | .jpeg | .png)</span></p>
          </div>

          <div className="mt-4 p-4">
            <Upload
              className='width-uploader'
              action=""
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1} // Limiting to accept only one image at a time
            >
              {fileList.length === 0 && uploadButton}
            </Upload>
          </div>
          <div className="d-flex justify-content-center">
            <button className='p-2 btn btn-outline-light w-25' onClick={handleExtract}>Extract</button>
          </div>

          <div className='mt-3 p-4  text-start scroller' style={{ position: 'relative', overflowY: 'auto', maxHeight: '500px' }}>
          <p className='text-white'> {extractedText} </p>
          </div>


        </div>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default Home;
