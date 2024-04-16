import React, { useState } from "react";
import styles from "./UploadImage.module.css";
import Image from "next/image";
import { useEffect } from "react";
import ImgIcon from "@/icons/ImgIcon";

interface Props {
  setImg: any;
  img?: any;
}

const UploadImage = ({ setImg, img }: Props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImageBase64(result);
          setImg(imageBase64);
          setImageSrc(URL.createObjectURL(file));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setImg(imageBase64);
  }, [imageBase64, img]);

  const deleteImage = () => {
    URL.revokeObjectURL(imageSrc);
    setImageSrc("");
    setImageBase64("");
  };

  return (
    <div className={styles.container}>
      <label className={styles.custumFileUpload}>
        {!imageSrc ? (
          <>
            {img && !isDeleted ? (
              <>
                <Image src={img} alt="Uploaded" width={200} height={200} />
              </>
            ) : (
              <>
                <div className={styles.icon}>
                  <ImgIcon />
                </div>
                <div className={styles.text}>
                  <span>You can upload only .PNG .JPEG .JPG</span>
                </div>
                <input type="file" id="file" onChange={handleImageChange} />
              </>
            )}
          </>
        ) : (
          <Image src={imageSrc} alt="Uploaded" width={200} height={200} />
        )}
      </label>
      {imageSrc ? (
        <button className={styles.deleteBtn} onClick={deleteImage}>
          Delete
        </button>
      ) : (
        <></>
      )}
      {img && !isDeleted ? (
        <button
          className={styles.deleteBtn}
          onClick={() => setIsDeleted((prev) => !prev)}
        >
          Delete
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UploadImage;
