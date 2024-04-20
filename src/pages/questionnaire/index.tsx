import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import styles from "./Questionnaire.module.css"
import { Nunito } from "next/font/google";
import Questionnaire from "@/components/Questionnaire/Questionnaire";

const nunito = Nunito({ subsets: ["latin"] });

const questionnaire = () => {

    return (
        <SideBarLayout>
            <div className={`${nunito.className} ${styles.container}`}>
                <Questionnaire/>
            </div>
        </SideBarLayout>
    );
};

export default questionnaire;
