// Image sets shared across sections. Product and packaging photos come from the company profile.
import stepConcept from '../assets/profile/step-concept.jpg';
import stepSampling from '../assets/profile/step-sampling.jpg';
import stepPackaging from '../assets/profile/step-packaging.jpg';
import formulation from '../assets/stock/formulation.jpg';
import launch from '../assets/stock/launch.jpg';
import manufacturing from '../assets/stock/manufacturing.jpg';
import lineup from '../assets/stock/about.jpg';
import blankBox from '../assets/stock/hero-lab.jpg';

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
import body1 from '../assets/profile/body-1.jpg';
import body2 from '../assets/profile/body-2.jpg';
import body3 from '../assets/profile/body-3.jpg';
import body4 from '../assets/profile/body-4.jpg';
import relax1 from '../assets/profile/relax-1.jpg';
import relax2 from '../assets/profile/relax-2.jpg';
import relax3 from '../assets/profile/relax-3.jpg';
import relax4 from '../assets/profile/relax-4.jpg';
import shower1 from '../assets/profile/shower-1.jpg';
import shower2 from '../assets/profile/shower-2.jpg';
import shower3 from '../assets/profile/shower-3.jpg';
import shower4 from '../assets/profile/shower-4.jpg';
import hair1 from '../assets/profile/hair-1.jpg';
import hair2 from '../assets/profile/hair-2.jpg';
import hair3 from '../assets/profile/hair-3.jpg';
import hair4 from '../assets/profile/hair-4.jpg';
import hair5 from '../assets/profile/hair-5.jpg';
import hair6 from '../assets/profile/hair-6.jpg';
import hair7 from '../assets/profile/hair-7.jpg';
import hair8 from '../assets/profile/hair-8.jpg';
import tan1 from '../assets/profile/tan-1.jpg';
import tan2 from '../assets/profile/tan-2.jpg';
import tan3 from '../assets/profile/tan-3.jpg';

// One image per partnership-journey step, in step order.
export const JOURNEY_IMAGES = [stepConcept, formulation, stepSampling, stepPackaging, launch, manufacturing, lineup];

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
  body: [body1, body2, body3, body4],
  relax: [relax1, relax2, relax3, relax4],
  shower: [shower1, shower2, shower3, shower4],
  hair: [hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8],
  tan: [tan1, tan2, tan3],
};

export const CATALOG_COVERS = {
  skin: skin4,
  body: body1,
  relax: relax3,
  shower: shower1,
  hair: hair4,
  tan: tan2,
};
