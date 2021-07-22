import React, { useCallback } from "react";
import PropTypes from "prop-types";

// TODO: Add an option for BlurHash thumbnails
// TODO: Handle case when width/height is 0

const defaultFluidRatios = [0.25, 0.5, 1.5, 2];
const defaultFixedRatios = [1, 1.5, 2];
const defaultFluidMaxWidth = 800;
const defaultFixedWidth = 400;

function getFluidAndFixed({ fluid, fixed, baseUrl }) {
  const fluidAndFixed = {
    fixed: undefined,
    fluid: undefined,
  };
  if (fluid) {
    let fluidData;
    if (Array.isArray(fluid)) {
      fluidData = fluid.map((fluidElem) =>
        getFluidData({ ...fluidElem, baseUrl })
      );
    } else {
      fluidData = getFluidData({ ...fluid, baseUrl });
    }
    fluidAndFixed.fluid = groupByMedia([].concat(fluidData));
  }
  if (fixed) {
    let fixedData;
    if (Array.isArray(fixed)) {
      fixedData = fixed.map((fixedElem) =>
        getFixedData({ ...fixedElem, baseUrl })
      );
    } else {
      fixedData = getFixedData({ ...fixed, baseUrl });
    }
    fluidAndFixed.fixed = groupByMedia([].concat(fixedData));
  }
  return fluidAndFixed;
}

function getFluidData(fluidData) {
  const {
    baseUrl,
    maxHeight,
    maxWidth = defaultFluidMaxWidth,
    srcSetBeakpoints,
    fitInside,
    aspectRatio,
    image: { handle, width: ogWidth, height: ogHeight },
  } = fluidData;

  const constructImageURI = getBaseImageURI({ baseUrl, handle });

  const fixedDimension = maxWidth === undefined ? "maxHeight" : "maxWidth";
  const noCustomBreakpoints = !srcSetBeakpoints || !srcSetBeakpoints.length;

  const defaultFluidSizes = defaultFluidRatios.map((ratio) =>
    Math.round(fluidData[fixedDimension] * ratio)
  );

  const initialFluidSizes = noCustomBreakpoints
    ? defaultFluidSizes
    : srcSetBeakpoints;

  // adds maxWidth / maxHeight to sizes
  const fluidSizesWithMax = [...initialFluidSizes, fluidData[fixedDimension]];

  const filteredSizes = fluidSizesWithMax.filter(
    (size) => size < (fixedDimension === "maxWidth" ? ogWidth : ogHeight)
  );
  // Add the original size to ensure the largest image possible
  // is available for small images.
  const fluidSizes = [
    ...filteredSizes,
    fixedDimension === "maxWidth" ? ogWidth : ogHeight,
  ];

  const sortedSizes = fluidSizes.sort((a, b) => a - b);

  const transforms = sortedSizes.map((size) => {
    const isCustomAspectRatio = ogWidth / ogHeight !== aspectRatio;
    const transform = {
      height: undefined,
      width: undefined,
    };

    if (fixedDimension === `maxHeight`) {
      transform.height = size;
      if (isCustomAspectRatio) {
        transform.width = Math.round(aspectRatio * size);
      }
    }
    if (fixedDimension === `maxWidth`) {
      transform.width = size;
      if (isCustomAspectRatio) {
        transform.height = Math.round(size / aspectRatio);
      }
    }
    if (maxHeight !== undefined && maxWidth !== undefined) {
      if (fitInside) {
        // Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
        transform.height = Math.round(
          size * (Math.min(maxHeight, ogHeight) / Math.min(maxWidth, ogWidth))
        );
      }
      transform.height = Math.round(size * (maxHeight / maxWidth));
    }

    return transform;
  });

  const srcSetURIs = transforms.map((transform) => {
    const imageURI = getImageURIFromTransform({ transform, constructImageURI });
    const widthParam =
      transform.width || Math.round((ogWidth * transform.height) / ogHeight);
    return `${imageURI} ${widthParam}w`;
  });

  const src = getImageURIFromTransform({
    transform: transforms[0],
    constructImageURI,
  });
  const srcSet = srcSetURIs.join(",\n");

  // calculate presentationSizes
  const sizeWithDensityOneIndex = fluidSizes.findIndex(
    (size) =>
      size ===
      (fixedDimension === `maxWidth`
        ? Math.min(maxWidth, ogWidth)
        : Math.min(maxHeight, ogHeight))
  );
  const sizeWithDensityOne = fluidSizes[sizeWithDensityOneIndex];

  const presentationWidth =
    fixedDimension === `maxWidth`
      ? sizeWithDensityOne
      : Math.round((ogWidth * sizeWithDensityOne) / ogHeight);

  const sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`;
  return {
    srcSet,
    sizes,
    src,
    aspectRatio: aspectRatio || ogWidth / ogHeight,
    thumbnail: constructImageURI([`resize=width:20`, `blur=amount:2`]),
    media: fluidData.media,
  };
}

function getFixedData(fixedData) {
  const { baseUrl, height, width = defaultFixedWidth, image } = fixedData;

  const fixedDimension = width === undefined ? "height" : "width";
  const defaultFixedSizes = defaultFixedRatios.map((ratio) =>
    Math.round(fixedData[fixedDimension] * ratio)
  );

  const filteredSizes = defaultFixedSizes.filter(
    (size) => size <= image[fixedDimension]
  );

  // If there's no fluid images after filtering (e.g. image is smaller than what's
  // requested, add back the original so there's at least something)
  const fixedSizes =
    filteredSizes.length > 0 ? filteredSizes : [image[fixedDimension]];

  const sortedSizes = fixedSizes.sort();

  const transforms = sortedSizes.map((size) => {
    const transform = {
      height: fixedDimension === "height" ? size : undefined,
      width: fixedDimension === "width" ? size : undefined,
    };

    if (width !== undefined && height !== undefined) {
      transform.height = Math.round(size * (height / width));
    }

    return transform;
  });

  const constructImageURI = getBaseImageURI({ baseUrl, handle: image.handle });
  const srcSetURIs = transforms.map((transform) =>
    getImageURIFromTransform({ transform, constructImageURI })
  );

  const srcSetStrings = srcSetURIs.map((uri, index) => {
    let resolution;
    switch (index) {
      case 0:
        resolution = `1x`;
        break;
      case 1:
        resolution = `1.5x`;
        break;
      case 2:
        resolution = `2x`;
        break;
      default:
    }

    return `${uri} ${resolution}`;
  });

  const srcSet = srcSetStrings.join(",\n");

  const calculatedWidth =
    width || Math.round((height * image.width) / image.height);
  const calculatedHeight =
    height || Math.round((width * image.height) / image.width);

  return {
    srcSet,
    src: srcSetURIs[0],
    width: calculatedWidth,
    height: calculatedHeight,
    thumbnail: constructImageURI([`resize=width:20`, `blur=amount:2`]),
    media: fixedData.media,
  };
}

function getImageURIFromTransform({ transform, constructImageURI }) {
  let imageURI;
  if (transform.height && transform.width) {
    imageURI = constructImageURI([
      `resize=width:${transform.width},height:${transform.height}`,
    ]);
  }
  if (!transform.width) {
    imageURI = constructImageURI([`resize=height:${transform.height}`]);
  }
  if (!transform.height) {
    imageURI = constructImageURI([`resize=width:${transform.width}`]);
  }
  return imageURI;
}

function getBaseImageURI({ baseUrl, handle }) {
  return (transforms = []) =>
    [
      baseUrl,
      "cache=expiry:max",
      `auto_image`,
      ...transforms,
      `compress`,
      handle,
    ].join("/");
}

const hasArtDirectionSupport = (currentData) =>
  !!currentData &&
  Array.isArray(currentData) &&
  currentData.some((image) => typeof image.media !== `undefined`);

const matchesMedia = ({ media }) =>
  media ? isBrowser && !!window.matchMedia(media).matches : false;

const getImageSrcKey = ({ fluid, fixed }) => {
  const data = fluid ? getCurrentSrcData(fluid) : getCurrentSrcData(fixed);

  return data.src;
};

const getCurrentSrcData = (currentData) => {
  if (isBrowser && hasArtDirectionSupport(currentData)) {
    // Do we have an image for the current Viewport?
    const foundMedia = currentData.findIndex(matchesMedia);
    if (foundMedia !== -1) {
      return currentData[foundMedia];
    }

    // No media matches, select first element without a media condition
    const noMedia = currentData.findIndex(
      (image) => typeof image.media === `undefined`
    );
    if (noMedia !== -1) {
      return currentData[noMedia];
    }
  }
  // Else return the first image.
  return currentData[0];
};

// Cache if we've seen an image before so we don't bother with
// lazy-loading & fading in on subsequent mounts.
const imageCache = Object.create({});
const inImageCache = (props) => {
  // Find src
  const src = getImageSrcKey(props);
  return imageCache[src] || false;
};

const activateCacheForImage = (props) => {
  // Find src
  const src = getImageSrcKey(props);
  imageCache[src] = true;
};

// Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/
const hasNativeLazyLoadSupport =
  typeof HTMLImageElement !== `undefined` &&
  `loading` in HTMLImageElement.prototype;

const isBrowser = typeof window !== `undefined`;
const hasIOSupport = isBrowser && window.IntersectionObserver;

let io;
const listeners = new WeakMap();

function getIO() {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (listeners.has(entry.target)) {
            const cb = listeners.get(entry.target);
            // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              io.unobserve(entry.target);
              listeners.delete(entry.target);
              cb();
            }
          }
        });
      },
      { rootMargin: `200px` }
    );
  }

  return io;
}

function generateImageSources(imageVariants) {
  return imageVariants.map(({ src, srcSet, media, sizes }) => (
    <React.Fragment key={src}>
      <source media={media} srcSet={srcSet} sizes={sizes} />
    </React.Fragment>
  ));
}

// Return an array ordered by elements having a media prop, does not use
// native sort, as a stable sort is not guaranteed by all browsers/versions
function groupByMedia(imageVariants) {
  const withMedia = [];
  const without = [];
  imageVariants.forEach((variant) =>
    (variant.media ? withMedia : without).push(variant)
  );

  if (without.length > 1 && process.env.NODE_ENV !== `production`) {
    console.warn(
      `There's ${without.length} sources without a media property. They might be ignored by the browser.`
    );
  }

  return [...withMedia, ...without];
}

function generateThumbSources(imageVariants) {
  return imageVariants.map(({ src, media, thumbnail }) => (
    <source key={src} media={media} srcSet={thumbnail} />
  ));
}

function generateNoscriptSource({ srcSet, media, sizes }) {
  const src = srcSet;
  const mediaAttr = media ? `media="${media}" ` : ``;
  const sizesAttr = sizes ? `sizes="${sizes}" ` : ``;

  return `<source ${mediaAttr}srcset="${src}" ${sizesAttr}/>`;
}

function generateNoscriptSources(imageVariants) {
  return imageVariants
    .map((variant) => generateNoscriptSource(variant))
    .join(``);
}

const listenToIntersections = (el, cb) => {
  const observer = getIO();

  if (observer) {
    observer.observe(el);
    listeners.set(el, cb);
  }

  return () => {
    observer.unobserve(el);
    listeners.delete(el);
  };
};

const noscriptImg = (props) => {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  const src = props.src ? `src="${props.src}" ` : `src="" `; // required attribute
  const sizes = props.sizes ? `sizes="${props.sizes}" ` : ``;
  const srcSet = props.srcSet ? `srcset="${props.srcSet}" ` : ``;
  const title = props.title ? `title="${props.title}" ` : ``;
  const alt = props.alt ? `alt="${props.alt}" ` : `alt="" `; // required attribute
  const width = props.width ? `width="${props.width}" ` : ``;
  const height = props.height ? `height="${props.height}" ` : ``;
  const crossOrigin = props.crossOrigin
    ? `crossorigin="${props.crossOrigin}" `
    : ``;
  const loading = props.loading ? `loading="${props.loading}" ` : ``;
  const draggable = props.draggable ? `draggable="${props.draggable}" ` : ``;

  const sources = generateNoscriptSources(props.imageVariants);

  return `<picture>${sources}<img ${loading}${width}${height}${sizes}${srcSet}${src}${alt}${title}${crossOrigin}${draggable}style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>`;
};

const Placeholder = React.forwardRef((props, ref) => {
  const {
    src,
    imageVariants,
    generateSources,
    spreadProps,
    ariaHidden,
  } = props;

  const baseImage = (
    <Img ref={ref} src={src} {...spreadProps} ariaHidden={ariaHidden} />
  );

  return imageVariants.length > 1 ? (
    <picture>
      {generateSources(imageVariants)}
      {baseImage}
    </picture>
  ) : (
    baseImage
  );
});

const Img = React.forwardRef((props, ref) => {
  const {
    sizes,
    srcSet,
    src,
    alt,
    style,
    onLoad,
    onError,
    loading,
    draggable,
    // `ariaHidden`props is used to exclude placeholders from the accessibility tree.
    ariaHidden,
    ...otherProps
  } = props;

  return (
    <img
      aria-hidden={ariaHidden}
      sizes={sizes}
      srcSet={srcSet}
      src={src}
      alt={alt}
      {...otherProps}
      onLoad={onLoad}
      onError={onError}
      ref={ref}
      loading={loading}
      draggable={draggable}
      style={{
        position: `absolute`,
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
        objectPosition: `center`,
        ...style,
      }}
    />
  );
});

Img.propTypes = {
  style: PropTypes.object,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
};

const Image = (props) => {
  const { Tag, baseUrl } = props;
  const imageData = React.useMemo(
    () =>
      getFluidAndFixed({
        fluid: props.fluid,
        fixed: props.fixed,
        baseUrl,
      }),
    [baseUrl, props.fluid, props.fixed]
  );

  const { fluid, fixed } = imageData;

  const imageRef = React.useRef();
  const defaultPlaceholderRef = React.useRef();
  const placeholderRef = props.placeholderRef || defaultPlaceholderRef;

  const cleanUpListeners = React.useRef();
  const seenBefore = isBrowser && inImageCache(imageData);
  const isCritical = props.loading === `eager`;
  const addNoScript = !(isCritical && !props.fadeIn);
  const useIOSupport =
    !hasNativeLazyLoadSupport && hasIOSupport && !isCritical && !seenBefore;

  const isInitiallyVisible =
    isCritical || (isBrowser && (hasNativeLazyLoadSupport || !useIOSupport));
  const [isVisible, setIsVisible] = React.useState(isInitiallyVisible);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgCached, setImgCached] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(isBrowser);

    if (isVisible && typeof props.onStartLoad === "function") {
      props.onStartLoad({ wasCached: inImageCache(imageData) });
    }
    if (isCritical) {
      const img = imageRef.current;
      if (img && img.complete) {
        handleImageLoaded();
      }
    }
    return () => {
      if (cleanUpListeners.current) {
        cleanUpListeners.current();
      }
    };
    // only execute this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      const imageInCache = inImageCache(imageData);
      setImgLoaded(imageInCache);
      // `currentSrc` should be a string, but can be `undefined` in IE,
      // !! operator validates the value is not undefined/null/""
      // for lazyloaded components this might be null
      // TODO fix imgCached behaviour as it's now false when it's lazyloaded
      setImgCached(!!imageRef.current?.currentSrc);
    }
  }, [isVisible, imageRef, imageData]);

  const { onStartLoad } = props;
  const handleRef = React.useCallback(
    (ref) => {
      if (useIOSupport && ref) {
        cleanUpListeners.current = listenToIntersections(ref, () => {
          const imageInCache = inImageCache(imageData);
          if (!isVisible && typeof onStartLoad === "function") {
            onStartLoad({ wasCached: imageInCache });
          }
          // imgCached and imgLoaded must update after isVisible,
          // Once isVisible is true, imageRef becomes accessible, which imgCached needs access to.
          // imgLoaded and imgCached are in a 2nd state change call to be changed together,
          // avoiding initiating unnecessary animation frames from style changes
          setIsVisible(true);
        });
      }
    },
    [imageData, isVisible, onStartLoad, useIOSupport]
  );

  const { onLoad } = props;
  const handleImageLoaded = useCallback(() => {
    activateCacheForImage(imageData);
    setImgLoaded(true);

    if (onLoad) {
      onLoad();
    }
  }, [onLoad, imageData]);

  const { style = {}, imgStyle = {}, placeholderStyle = {} } = props;

  const imageVariants = fluid || fixed;
  // Abort early if missing image data
  if (!imageVariants) {
    return null;
  }

  const fadeIn = !seenBefore && props.fadeIn;
  const shouldReveal = fadeIn === false || imgLoaded;
  const shouldFadeIn = fadeIn === true && !imgCached;

  const imageStyle = {
    opacity: shouldReveal ? 1 : 0,
    transition: shouldFadeIn ? `opacity ${props.durationFadeIn}ms` : `none`,
    ...imgStyle,
  };

  const bgColor =
    typeof backgroundColor === "boolean" ? "lightgray" : props.backgroundColor;

  const delayHideStyle = {
    transitionDelay: `${props.durationFadeIn}ms`,
  };

  const imagePlaceholderStyle = {
    opacity: imgLoaded ? 0 : 1,
    ...(shouldFadeIn && delayHideStyle),
    ...imgStyle,
    ...placeholderStyle,
  };

  const placeholderImageProps = {
    title: props.title,
    alt: !isVisible ? props.alt : "",
    style: imagePlaceholderStyle,
    className: props.placeholderClassName,
    itemProp: props.itemProp,
  };

  const image = !isHydrated
    ? imageVariants[0]
    : getCurrentSrcData(imageVariants);

  if (fluid) {
    return (
      <Tag
        className={`${
          props.className ? props.className : ``
        } react-filestack-image-wrapper`}
        style={{
          position: `relative`,
          overflow: `hidden`,
          maxWidth: image.maxWidth ? `${image.maxWidth}px` : null,
          maxHeight: image.maxHeight ? `${image.maxHeight}px` : null,
          ...style,
        }}
        ref={handleRef}
        key={`fluid-${JSON.stringify(image.srcSet)}`}
      >
        {/* Preserve the aspect ratio. */}
        <Tag
          aria-hidden
          style={{
            width: `100%`,
            paddingBottom: `${100 / image.aspectRatio}%`,
          }}
        />

        {/* Show a solid background color. */}
        {bgColor && (
          <Tag
            aria-hidden
            title={props.title}
            style={{
              backgroundColor: bgColor,
              position: `absolute`,
              top: 0,
              bottom: 0,
              opacity: !imgLoaded ? 1 : 0,
              right: 0,
              left: 0,
              ...(shouldFadeIn && delayHideStyle),
            }}
          />
        )}

        {/* Show the blurry image. */}
        {image.thumbnail && (
          <Placeholder
            ariaHidden
            ref={placeholderRef}
            src={image.thumbnail}
            spreadProps={placeholderImageProps}
            imageVariants={imageVariants}
            generateSources={generateThumbSources}
          />
        )}

        {/* Once the image is visible (or the browser doesn't support IntersectionObserver), start downloading the image */}
        {isVisible && (
          <picture>
            {generateImageSources(imageVariants)}
            <Img
              alt={props.alt}
              title={props.title}
              sizes={image.sizes}
              src={image.src}
              crossOrigin={props.crossOrigin}
              srcSet={image.srcSet}
              style={imageStyle}
              ref={imageRef}
              onLoad={handleImageLoaded}
              onError={props.onError}
              itemProp={props.itemProp}
              loading={props.loading}
              draggable={props.draggable}
            />
          </picture>
        )}

        {/* Show the original image during server-side rendering if JavaScript is disabled */}
        {addNoScript && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: noscriptImg({
                alt: props.alt,
                title: props.title,
                loading: props.loading,
                ...image,
                imageVariants,
              }),
            }}
          />
        )}
      </Tag>
    );
  }

  if (fixed) {
    const imageVariants = fixed;
    const image = getCurrentSrcData(fixed);

    const divStyle = {
      position: `relative`,
      overflow: `hidden`,
      display: `inline-block`,
      width: image.width,
      height: image.height,
      ...style,
    };

    if (style.display === `inherit`) {
      delete divStyle.display;
    }

    return (
      <Tag
        className={`${
          props.className ? props.className : ``
        } react-filestack-image-wrapper`}
        style={divStyle}
        ref={handleRef}
        key={`fixed-${JSON.stringify(image.srcSet)}`}
      >
        {/* Show a solid background color. */}
        {bgColor && (
          <Tag
            aria-hidden
            title={props.title}
            style={{
              backgroundColor: bgColor,
              width: image.width,
              opacity: !imgLoaded ? 1 : 0,
              height: image.height,
              ...(shouldFadeIn && delayHideStyle),
            }}
          />
        )}

        {/* Show the blurry image. */}
        {image.thumbnail && (
          <Placeholder
            ariaHidden
            ref={placeholderRef}
            src={image.thumbnail}
            spreadProps={placeholderImageProps}
            imageVariants={imageVariants}
            generateSources={generateThumbSources}
          />
        )}

        {/* Once the image is visible, start downloading the image */}
        {isVisible && (
          <picture>
            {generateImageSources(imageVariants)}
            <Img
              alt={props.alt}
              title={props.title}
              width={image.width}
              height={image.height}
              sizes={image.sizes}
              src={image.src}
              crossOrigin={props.crossOrigin}
              srcSet={image.srcSet}
              style={imageStyle}
              ref={imageRef}
              onLoad={handleImageLoaded}
              onError={props.onError}
              itemProp={props.itemProp}
              loading={props.loading}
              draggable={props.draggable}
            />
          </picture>
        )}

        {/* Show the original image during server-side rendering if JavaScript is disabled */}
        {addNoScript && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: noscriptImg({
                alt: props.alt,
                title: props.title,
                loading: props.loading,
                ...image,
                imageVariants,
              }),
            }}
          />
        )}
      </Tag>
    );
  }

  return null;
};

Image.defaultProps = {
  fadeIn: true,
  durationFadeIn: 500,
  alt: ``,
  Tag: `div`,
  // We set it to `lazy` by default because it's best to default to a performant
  // setting and let the user "opt out" to `eager`
  loading: `lazy`,
  baseUrl: `https://cdn.filestackcontent.com`,
};

const imageObject = PropTypes.shape({
  handle: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  base64: PropTypes.string,
});

const fixedObject = PropTypes.shape({
  image: imageObject.isRequired,
  media: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
});

const fluidObject = PropTypes.shape({
  image: imageObject.isRequired,
  media: PropTypes.string,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  fitInside: PropTypes.bool,
  srcSetBeakpoints: PropTypes.arrayOf(PropTypes.number),
});

Image.propTypes = {
  baseUrl: PropTypes.string,
  fixed: PropTypes.oneOfType([fixedObject, PropTypes.arrayOf(fixedObject)]),
  fluid: PropTypes.oneOfType([fluidObject, PropTypes.arrayOf(fluidObject)]),
  fadeIn: PropTypes.bool,
  durationFadeIn: PropTypes.number,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Support Glamor's css prop.
  crossOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  placeholderClassName: PropTypes.string,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onStartLoad: PropTypes.func,
  Tag: PropTypes.string,
  itemProp: PropTypes.string,
  loading: PropTypes.oneOf([`auto`, `lazy`, `eager`]),
  draggable: PropTypes.bool,
};

export default Image;
