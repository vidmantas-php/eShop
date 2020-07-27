import React from "react";
import './Footer.css'
import { useTranslation } from "react-i18next";

function Footer() {

    const { t } = useTranslation("footer");

    return (
        <footer className="main-footer">
            {/* <div className="container">
                <div className="row"> */}
                     {/* col 1 */}
                     {/* <div className="col">
                         <h4>eShop INC</h4>
                         <ul className="list-unstyled">
                             <li>+37024564479</li>
                             <li>Lithuania, Vilnius</li>
                             <li>Vilniaus g. 8</li>
                         </ul>
                     </div> */}
                     {/* col 2 */}
                     {/* <div className="col">
                         <h4>eShop INC</h4>
                         <ul className="list-unstyled">
                             <li>+37024564479</li>
                             <li>Lithuania, Vilnius</li>
                             <li>Vilniaus g. 8</li>
                         </ul>
                     </div> */}
                     {/* col3 */}
                     {/* <div className="col">
                         <h4>eShop INC</h4>
                         <ul className="list-unstyled">
                             <li>+37024564479</li>
                             <li>Lithuania, Vilnius</li>
                             <li>Vilniaus g. 8</li>
                         </ul>
                     </div>
                </div> */}
                {/* <hr />
                <div className="row"> */}
                    <div className="col-sm footer-center">
                        &copy;{new Date().getFullYear()} {t("rights")} 
                    </div>

                {/* </div>
                </div> */}
            {/* </div> */}
        </footer>
    )
}


export default Footer;