// Image sets shared across sections. Product and packaging photos come from the company profile;
// the profile's card photos that bleed off their frame are replaced by complete shots of similar containers.
import stepConcept from '../assets/profile/step-concept.jpg';
import stepSampling from '../assets/profile/step-sampling.jpg';
import stepPackaging from '../assets/profile/step-packaging.jpg';
import formulation from '../assets/stock/formulation.jpg';
import launch from '../assets/stock/launch.jpg';
import manufacturing from '../assets/stock/manufacturing.jpg';
import delivery from '../assets/stock/delivery.jpg';
import blankBox from '../assets/stock/labels-box.jpg';

import packBottle from '../assets/profile/pack-bottle.jpg';
import packJar from '../assets/profile/pack-jar.jpg';
import packTube from '../assets/profile/pack-tube.jpg';
import packPump from '../assets/profile/pack-pump.jpg';
import packSpray from '../assets/profile/pack-spray.jpg';
import packCustom from '../assets/profile/pack-custom.jpg';

import skin1 from '../assets/profile/skin-1.jpg';
import skin2 from '../assets/profile/skin-2.jpg';
import skin3 from '../assets/profile/skin-3.jpg';
import skin4 from '../assets/profile/skin-4.jpg';
import catPump from '../assets/profile/cat-pump.jpg';
import catDropper from '../assets/profile/cat-dropper.jpg';
import catDarkPump from '../assets/profile/cat-dark-pump.jpg';
import catStick from '../assets/profile/cat-stick.jpg';
import relax1 from '../assets/profile/relax-1.jpg';
import relax2 from '../assets/profile/relax-2.jpg';
import relax3 from '../assets/profile/relax-3.jpg';
import relax4 from '../assets/profile/relax-4.jpg';
import shower1 from '../assets/profile/shower-1.jpg';
import hair1 from '../assets/profile/hair-1.jpg';
import hair2 from '../assets/profile/hair-2.jpg';
import hair3 from '../assets/profile/hair-3.jpg';
import hair4 from '../assets/profile/hair-4.jpg';
import hair5 from '../assets/profile/hair-5.jpg';
import hair6 from '../assets/profile/hair-6.jpg';
import hair7 from '../assets/profile/hair-7.jpg';
import hair8 from '../assets/profile/hair-8.jpg';

// One image per partnership-journey step, in step order.
export const JOURNEY_IMAGES = [stepConcept, formulation, stepSampling, stepPackaging, launch, manufacturing, delivery];

export const MANUFACTURING_IMAGE = manufacturing;

export const PACKAGING_IMAGES = {
  bottle: packBottle,
  jar: packJar,
  tube: packTube,
  pump: packPump,
  spray: packSpray,
  labels: blankBox,
  custom: packCustom,
};

export const CATALOG_IMAGES = {
  skin: [skin1, skin2, skin3, skin4],
  body: [catPump, catDropper],
  relax: [relax1, relax2, relax3, relax4],
  shower: [shower1, catDarkPump],
  hair: [hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8],
  tan: [catStick, packJar],
};

export const CATALOG_COVERS = {
  skin: skin4,
  body: catPump,
  relax: relax3,
  shower: shower1,
  hair: hair4,
  tan: catStick,
};
