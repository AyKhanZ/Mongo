import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import styles from './Cube.module.css'
import CubeContent from '../CubeContent/CubeContent';

const Cube: React.FC = ({product}: any) => { 
  const containerRef = useRef<HTMLDivElement>(null);
  const [service, setService] = useState('Комплексная Автоматизация')
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (containerRef.current && containerRef.current.childElementCount === 0) {
        containerRef.current.appendChild(renderer.domElement);
      }
      camera.position.z = 5;

      scene.background = new THREE.Color('#E2F1F1')

      const pointLight = new THREE.PointLight(0xffffff, 1000, 500);
      pointLight.position.set(0,20, 10);
      const ambientLight = new THREE.AmbientLight(0xffffff, 2);

      scene.add(pointLight, ambientLight);

      const geometry = new THREE.BoxGeometry( 3, 3, 3);
      const textureLoader = new THREE.TextureLoader();

      const founderTexture = textureLoader.load('/комплексная автоматизация.png');
      const jhonTexture = textureLoader.load('/итс.png');
      const quantinTexture = textureLoader.load('/бухгалтерия.png');

      const founderMaterial = new THREE.MeshStandardMaterial({ map: founderTexture });
      const jhonMaterial = new THREE.MeshStandardMaterial({ map: jhonTexture });
      const quantinMaterial = new THREE.MeshStandardMaterial({ map: quantinTexture });
      const defaultMaterial = new THREE.MeshStandardMaterial({ color: 0x3d8584 });

      const materials = [
        defaultMaterial, // right face 
        defaultMaterial, // left face
        quantinMaterial, // top face
        jhonMaterial, // bottom face
        founderMaterial, // front face
        founderMaterial // back face
      ];

      // Create a new mesh with the updated materials
      const cube = new THREE.Mesh(geometry, materials);
      cube.rotation.y = 3
      cube.position.x = -2
      scene.add(cube);

      const renderScene = () => {
        renderer.render(scene, camera);

        if (cube.rotation.x < 1){
          setService('Комплексная Автоматизация')
          scene.background = new THREE.Color('#E2F1F1')
        } else if (cube.rotation.x >= 1 && cube.rotation.x <2) {
          setService('Бухгалтерия')
          scene.background = new THREE.Color('#D0E8E7');
        }  else if (cube.rotation.x >=2){
          setService('ИТС')
          scene.background = new THREE.Color('#F4FDFD')
        } else {
          scene.background = new THREE.Color('#F4FDFD')
        }

        requestAnimationFrame(renderScene);
      };

      renderScene();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
  
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
  
        renderer.setSize(width, height);
      };
  
      window.addEventListener('resize', handleResize);

      const handleScroll = () => {
        const t = document.body.getBoundingClientRect().top;
        cube.rotation.y > 1 ? cube.rotation.y = t* -0.005 : cube.rotation.y = t* 0.008
        cube.rotation.x = t * -0.005;
      };
  
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
  
      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('resize', handleResize);
      };

    }
  }, []);

  return (
  <div>
    <CubeContent service={service} />
    <div  className={styles.bg} ref={containerRef} />
  </div>);
};

export default Cube;