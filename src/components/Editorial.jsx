import { ArrowUpRight } from "lucide-react";
import { Picture } from "./Primitives";

export default function Editorial() {
  return (
    <section className="editorial-section" aria-labelledby="editorial-title">
      <div className="editorial-heading">
        <div>
          <p className="eyebrow">
            <span /> LE CARNET DE STYLE
          </p>
          <h2 id="editorial-title">
            Ne suivez pas les regards.
            <br />
            <em>Inspirez-les.</em>
          </h2>
        </div>
        <p>
          Une attitude. Une lumière. Une allure.
          <br />
          La bonne monture fait toute la différence.
        </p>
      </div>
      <div className="editorial-grid">
        <a className="editorial-item editorial-man" href="#montures">
          <div className="editorial-image">
            <Picture
              name="editorial-man"
              alt="Portrait illustratif d’un homme portant une monture optique fine dorée"
            />
            <span className="editorial-index">01 / L’ALLURE</span>
            <span className="editorial-image-arrow">
              <ArrowUpRight size={28} />
            </span>
          </div>
          <div className="editorial-caption">
            <h3>
              Le caractère,
              <br />
              <em>sans en faire trop.</em>
            </h3>
            <span>
              EXPLORER LES MONTURES <ArrowUpRight size={16} />
            </span>
          </div>
        </a>
        <a className="editorial-item editorial-woman" href="#montures">
          <div className="editorial-image">
            <Picture
              name="editorial-woman"
              alt="Portrait illustratif d’une femme souriante portant des lunettes optiques bordeaux"
            />
            <span className="editorial-index">02 / L’EXPRESSION</span>
            <span className="editorial-image-arrow">
              <ArrowUpRight size={28} />
            </span>
          </div>
          <div className="editorial-caption">
            <h3>
              Simplement <em>vous.</em>
            </h3>
            <span>
              TROUVER SON STYLE <ArrowUpRight size={16} />
            </span>
          </div>
        </a>
        <a className="editorial-item editorial-sunlight" href="#montures">
          <div className="editorial-image">
            <Picture
              name="sunlight"
              alt="Composition illustrative de lunettes de soleil écaille dans une lumière dorée"
            />
            <span className="editorial-index">03 / LA LUMIÈRE</span>
            <span className="editorial-image-arrow">
              <ArrowUpRight size={28} />
            </span>
          </div>
          <div className="editorial-caption">
            <h3>
              Du soleil dans <em>le regard.</em>
            </h3>
            <span>
              OSER LES SOLAIRES <ArrowUpRight size={16} />
            </span>
          </div>
        </a>
      </div>
      <p className="editorial-disclaimer">
        Une inspiration de style, pas un inventaire. Visuels éditoriaux générés
        par IA ; montures disponibles à confirmer en boutique.
      </p>
    </section>
  );
}
