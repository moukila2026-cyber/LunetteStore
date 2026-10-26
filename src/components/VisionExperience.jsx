import { useState } from "react";
import { ArrowUpRight, MoveHorizontal, RotateCcw } from "lucide-react";
import { Picture } from "./Primitives";
export default function VisionExperience() {
  const [clarity, setClarity] = useState(35);
  return (
    <section className="vision-section" aria-labelledby="vision-title">
      <div className="vision-copy">
        <p className="eyebrow">
          <span /> CHANGEZ DE PERSPECTIVE
        </p>
        <h2 id="vision-title">
          Le plaisir de voir
          <br />
          <em>chaque détail.</em>
        </h2>
        <p>
          Une belle monture attire le regard. Le confort visuel compte tout
          autant. En boutique, parlons de vos besoins et des solutions
          proposées.
        </p>
        <a className="text-link" href="#contact">
          Se renseigner sur le test de vue <ArrowUpRight size={18} />
        </a>
        <div className="vision-disclaimer">
          <strong>Une expérience visuelle, pas un test de vue.</strong>
          <p>
            Ce curseur modifie uniquement le flou de l’image. Il ne mesure pas
            votre vision et ne recommande aucune correction.
          </p>
        </div>
      </div>
      <div className="vision-interactive">
        <div className="vision-photo">
          <div
            style={{ filter: `blur(${(100 - clarity) / 14}px)` }}
            className="vision-photo-filter"
          >
            <Picture
              name="sunlight"
              alt="Illustration de lunettes de soleil sur un socle, dont le flou se règle avec le curseur"
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <span className="vision-photo-label">LE REGARD DANS LES DÉTAILS</span>
          <span className="vision-photo-note">
            Image illustrative · créée par IA
          </span>
          <span className="vision-target" aria-hidden="true">
            <MoveHorizontal size={27} />
          </span>
        </div>
        <div className="vision-controls">
          <div className="vision-control-heading">
            <label htmlFor="image-clarity">
              Jouez avec la netteté de l’image
            </label>
            <button
              onClick={() => setClarity(35)}
              aria-label="Réinitialiser l’effet de netteté"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <input
            id="image-clarity"
            type="range"
            min="0"
            max="100"
            step="1"
            value={clarity}
            onChange={(event) => setClarity(Number(event.target.value))}
            aria-describedby="clarity-hint"
            aria-valuetext={
              clarity === 100
                ? "Image sans flou ajouté"
                : `Netteté de l’illustration : ${clarity} sur 100`
            }
          />
          <div className="vision-control-labels" id="clarity-hint">
            <span>Flou artistique</span>
            <span>Sans flou ajouté</span>
          </div>
          <button
            className="vision-clear-button"
            onClick={() => setClarity(100)}
          >
            Voir l’image nette <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
