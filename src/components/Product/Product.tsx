import React from 'react'
import styles from './Product.module.css'
import Image from 'next/image'
import Link from 'next/link' 
import { Nunito } from "next/font/google";
import ReactMarkdown from 'react-markdown';

const nunito = Nunito({subsets: ["latin"]});

const Product = ({category, subcategory, product}: any) => {

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  function filterMarkdownElements(article: string) {
    const imagePattern = /!\[.*?\]\((.*?)\)/g; 
    const headingPattern = /#+\s.+/g; 
    const imageWithDescriptionPattern = /!\[.*?\]\((.*?)\)\n+/g; 

    const images = article.match(imagePattern);
    const filteredImages = images ? images.map((image: any) => image.match(/https?:\/\/[^\)]+/)[0]) : [];

    const filteredArticleWithoutImageDescriptions = article.replace(imageWithDescriptionPattern, '');

    const filteredArticleWithoutHeadings = filteredArticleWithoutImageDescriptions.replace(headingPattern, '');

    return  truncateText(filteredArticleWithoutHeadings, 300);
  }

  return (
    <div className={`${styles.horizontal} ${nunito.className}`}>                
        {subcategory=='Новости' ? 
        <Image
          className={styles.imgContainer}
          src={product.img}
          alt="Product image" 
          width={280}
          height={220}
        /> :
        <Image
          className={styles.imgContainer}
          src={product.combinedImage}
          alt="Product image" 
          width={280}
          height={220}
        />}
 
      <div className={styles.productContent}>
        <div className={styles.productTitle}>
          <h2 className={styles.title}>{product.name ? product.name : product.title}</h2>
        </div>

        <p className={styles.desc}>
          { category !== 'Услуги'  ? filterMarkdownElements(product.description) : product.description}
        </p>
        { category !== 'Услуги'  ? <Link className={styles.link} href={`/${category}/${subcategory}/${product.name ? product.name : product.title}`}>Подробнее</Link> : <></>}
      </div> 
    </div>
  )
}

export default Product