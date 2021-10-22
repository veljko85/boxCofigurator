window.picker = new EasyLogicColorPicker({
  container: document.getElementById("picker"),
});
var pickerOpen = false;
document.getElementById("pickColor").onclick = () => {
  if (!pickerOpen) {
    document.getElementById("picker").style.display = "block";
    pickerOpen = true;
  } else {
    document.getElementById("picker").style.display = "none";
    pickerOpen = false;
  }
};

window.pickerForShape = new EasyLogicColorPicker({
  container: document.getElementById("pickerForShape"),
});
var pickerForShapeOpen = false;
document.getElementById("colorOfShape").onclick = () => {
  if (!pickerForShapeOpen) {
    document.getElementById("pickerForShape").style.display = "block";
    pickerForShapeOpen = true;
  } else {
    document.getElementById("pickerForShape").style.display = "none";
    pickerForShapeOpen = false;
  }
};

//BABYLON
var canvas = document.getElementById("renderCanvasBox");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  //scene colors - first color, second transperent
  scene.clearColor = new BABYLON.Color3.FromHexString("#c8c8c8");
  // scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, -1),
    scene
  );
  light.intensity = 1;
  var light2 = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 1),
    scene
  );
  light2.intensity = 1;
  var light3 = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, -1, -1),
    scene
  );
  light3.intensity = 1;
  var light4 = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, -1, 1),
    scene
  );
  light4.intensity = 1;

  //camera
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, false);
  camera.setPosition(new BABYLON.Vector3(0, 0, -15));

  //enviormant
  scene.environmentTexture = new BABYLON.CubeTexture("studio.env", scene);
  scene.environmentIntensity = 1.5;

  //fabric canvas size
  var textureWidth = window.innerWidth * 0.4;
  var textureHeight = window.innerWidth * 0.333;

  // init fabric canvas
  var fabricCanvas = new fabric.Canvas("paintCanvas", {
    width: textureWidth,
    height: textureHeight,
    backgroundColor: "#ffffff",
    selectionColor: "green",
    selectionLineWidth: 30,
    borderColor: "red",
    cornerColor: "orange",
    cornerSize: 10,
  });

  document.getElementById("picker").onclick = () => {
    console.log(picker.getColor());
    fabricCanvas.set({
      backgroundColor: picker.getColor(),
    });
    fabricCanvas.renderAll();
  };
  // create a rectangle with angle=45
  function addRect() {
    var rect = new fabric.Rect({
      left: textureWidth * 0.255,
      top: textureHeight * 0.375,
      fill: "red",
      width: textureWidth * 0.2,
      height: textureWidth * 0.2,
      // angle: 45,
      cornerSize: 10,
      strokeWidth: 3,
      // selectable: false,
      // evented: false,
    });
    fabricCanvas.add(rect);
  }

  function addCircle() {
    var circle = new fabric.Circle({
      // fill: "red",
      // width: textureWidth * 0.2,
      // height: textureWidth * 0.2,
      // // angle: 45,
      // cornerSize: 10,
      // strokeWidth: 3,

      left: textureWidth * 0.255,
      top: textureHeight * 0.375,
      radius: textureWidth * 0.1,
      // stroke: "red",
      strokeWidth: 3,
      fill: "red",
    });
    fabricCanvas.add(circle);
  }

  document.getElementById("addShape").onclick = () => {
    document.getElementById("chooseShape").style.display = "block";
  };

  document.getElementById("addRect").onclick = () => {
    addRect();
    document.getElementById("chooseShape").style.display = "none";
  };

  document.getElementById("addCircle").onclick = () => {
    addCircle();
    document.getElementById("chooseShape").style.display = "none";
  };

  document.onclick = () => {
    if (
      fabricCanvas.getActiveObject() != undefined ||
      fabricCanvas.getActiveObject() != null
    ) {
      if (
        fabricCanvas.getActiveObject().type === "rect" ||
        fabricCanvas.getActiveObject().type === "circle" ||
        fabricCanvas.getActiveObject().type === "i-text"
      ) {
        console.log(fabricCanvas.getActiveObject().fill);
        document.getElementById("shapeColor").style.display = "block";
        document.getElementById("colorOfShape").style.backgroundColor =
          fabricCanvas.getActiveObject().fill;
      }
    } else {
      console.log("bbb");
      document.getElementById("shapeColor").style.display = "none";
      document.getElementById("pickerForShape").style.display = "none";
      pickerForShapeOpen = false;
    }
  };
  document.getElementById("pickerForShape").onclick = () => {
    console.log(pickerForShape.getColor());
    document.getElementById("colorOfShape").style.backgroundColor =
      pickerForShape.getColor();
    fabricCanvas.getActiveObject().set({
      fill: pickerForShape.getColor(),
    });
    fabricCanvas.renderAll();
  };
  // console.log(fabricCanvas.getObjects()[0].type);
  // setInterval(function () {
  //   console.log(fabricCanvas.getActiveObject().type);
  //   // if (fabricCanvas.getActiveObject().type === "rect") {
  //   //   console.log("aaaa");
  //   // }
  // }, 1000);
  // fabricCanvas.getActiveObject().set({
  //   fill: "blue",
  // });
  // fabricCanvas.renderAll();
  // fabricCanvas.moveTo(fabricCanvas.getObjects()[0], 10);

  function addText() {
    text = new fabric.IText("Click to edit text", {
      fontSize: 18,
      fontFamily: "Impact",
      // stroke: "#FF0000",
      fill: "#000000",
      strokeWidth: 0,
      top: textureHeight * 0.5 - 18,
      left: textureWidth * 0.245,
      lockScalingX: false,
      lockScalingY: false,
      uniScaleTransform: true,
      lockUniScaling: true,
    });
    fabricCanvas.add(text);
  }
  document.getElementById("addText").onclick = () => {
    document.getElementById("picker").style.display = "none";
    pickerOpen = false;
    addText();
  };
  // text.set({
  //   borderColor: "red",
  //   cornerColor: "orange",
  //   cornerSize: 10,
  // });

  document.getElementById("upload").onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.set({
          angle: 0,
          padding: 0,
          cornersize: 10,
          left: textureWidth * 0.255,
          top: textureHeight * 0.375,
          // height: 128,
          // width: 128,
        });
        image.scaleToHeight(textureWidth * 0.2);
        image.scaleToWidth(textureWidth * 0.2);
        // fabricCanvas.centerObject(image);
        fabricCanvas.add(image);
        fabricCanvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0].Width);
  };

  // fabric.Image.fromURL("img/logoQuince.png", function (myImg) {
  //   //i create an extra var for to change some image properties
  //   var img1 = myImg.set({ left: 0, top: 200, width: 200, height: 75 });
  //   fabricCanvas.add(img1);
  // });

  // fabricCanvas.moveTo(fabricCanvas.getObjects()[0], 10);
  // console.log(fabricCanvas.getObjects().indexOf(img1));

  function lintenKeysEvents() {
    document.onkeydown = checkKey;
    function checkKey(event) {
      if (event.keyCode == 46) {
        fabricCanvas.remove(fabricCanvas.getActiveObject());
      }
    }
  }
  lintenKeysEvents();

  var paintCanvas = document.getElementById("paintCanvas");

  var groundTexture = new BABYLON.DynamicTexture(
    "dyntex",
    paintCanvas,
    scene,
    true
  );

  var dynamicMaterial = new BABYLON.StandardMaterial("mat", scene);
  dynamicMaterial.diffuseTexture = groundTexture;
  dynamicMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  dynamicMaterial.backFaceCulling = false;

  //CREATE BOX

  //For dustFlapTopLeft split image between sides

  var shape = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(-3, 0, 0),
    new BABYLON.Vector3(-3, 0, 2),
    new BABYLON.Vector3(-0.7, 0, 2),
    new BABYLON.Vector3(0, 0, 0.5),
  ];

  var dustFlapTopLeftBox = BABYLON.MeshBuilder.CreateBox(
    "Box",
    { width: 0.5, height: 0.5, depth: 3 },
    scene,
    true
  );
  dustFlapTopLeftBox.position = new BABYLON.Vector3(-1.46, 1.46, 1.5);
  dustFlapTopLeftBox.rotation.z = -3.6;
  dustFlapTopLeftBox.rotation.y = 0.02;
  dustFlapTopLeftBox.isVisible = false;

  var fDustFlapTopLeft = new BABYLON.Vector4(0, 0, 0, 0); // front image = half the whole image along the width
  var bDustFlapTopLeft = new BABYLON.Vector4(0, 0.64, 0.2375, 0.82); // back image = second half along the width

  var dustFlapTopLeft = BABYLON.MeshBuilder.CreatePolygon(
    "",
    {
      shape: shape,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      frontUVs: fDustFlapTopLeft,
      backUVs: bDustFlapTopLeft,
    },
    scene
  );
  dustFlapTopLeft.position = new BABYLON.Vector3(0, 0, -1.5);
  dustFlapTopLeft.addRotation(0, -1.57, 3.14);
  dustFlapTopLeft.material = dynamicMaterial;
  dustFlapTopLeft.parent = dustFlapTopLeftBox;

  var shape2 = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 2),
    new BABYLON.Vector3(-2, 0, 2),
    new BABYLON.Vector3(-3, 0, 0.7),
    new BABYLON.Vector3(-3, 0, 0),
  ];

  var dustFlapTopRightBox = BABYLON.MeshBuilder.CreateBox(
    "Box",
    { width: 0.5, height: 0.5, depth: 3 },
    scene,
    true
  );
  dustFlapTopRightBox.position = new BABYLON.Vector3(1.46, 1.46, 1.5);
  dustFlapTopRightBox.rotation.z = -0.5;
  dustFlapTopRightBox.rotation.x = 3.14;
  dustFlapTopRightBox.rotation.y = 0.02;
  dustFlapTopRightBox.isVisible = false;

  var fDustFlapTopRight = new BABYLON.Vector4(0, 0, 0, 0); // front image = half the whole image along the width
  var bDustFlapTopRight = new BABYLON.Vector4(0.475, 0.64, 0.7125, 0.82); // back image = second half along the width

  var dustFlapTopRight = BABYLON.MeshBuilder.CreatePolygon(
    "",
    {
      shape: shape2,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      frontUVs: fDustFlapTopRight,
      backUVs: bDustFlapTopRight,
    },
    scene
  );
  dustFlapTopRight.position = new BABYLON.Vector3(0, 0, -1.5);
  dustFlapTopRight.addRotation(0, -1.57, 3.14);
  dustFlapTopRight.material = dynamicMaterial;
  dustFlapTopRight.parent = dustFlapTopRightBox;

  //panels of box
  const fPanelLeftUV = new BABYLON.Vector4(0, 0, 0, 0);
  const bPanelLeftUV = new BABYLON.Vector4(0, 0.36, 0.2375, 0.64);
  const panelLeft = BABYLON.MeshBuilder.CreatePlane("plane", {
    frontUVs: fPanelLeftUV,
    backUVs: bPanelLeftUV,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    size: 3,
  });
  panelLeft.position = new BABYLON.Vector3(-1.5, 0, 1.5);
  panelLeft.addRotation(0, 1.57, 0);
  panelLeft.material = dynamicMaterial;

  const fPanelFrontUV = new BABYLON.Vector4(0, 0, 0, 0);
  const bPanelFrontUV = new BABYLON.Vector4(0.2375, 0.36, 0.475, 0.64);
  const panelFront = BABYLON.MeshBuilder.CreatePlane("plane", {
    frontUVs: fPanelFrontUV,
    backUVs: bPanelFrontUV,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    size: 3,
  });
  panelFront.position.x = 0;
  panelFront.material = dynamicMaterial;

  const fPanelRightUV = new BABYLON.Vector4(0, 0, 0, 0);
  const bpanelRightUV = new BABYLON.Vector4(0.475, 0.36, 0.7125, 0.64);
  const panelRight = BABYLON.MeshBuilder.CreatePlane("plane", {
    frontUVs: fPanelRightUV,
    backUVs: bpanelRightUV,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    size: 3,
  });
  panelRight.position = new BABYLON.Vector3(1.5, 0, 1.5);
  panelRight.addRotation(0, -1.57, 0);
  panelRight.material = dynamicMaterial;

  const fPanelBackUV = new BABYLON.Vector4(0, 0, 0, 0);
  const bPanelBackUV = new BABYLON.Vector4(0.7125, 0.36, 0.95, 0.64);
  const panelBack = BABYLON.MeshBuilder.CreatePlane("plane", {
    frontUVs: fPanelBackUV,
    backUVs: bPanelBackUV,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    size: 3,
  });
  panelBack.addRotation(0, -3.14, 0);
  panelBack.position = new BABYLON.Vector3(0, 0, 3);
  panelBack.material = dynamicMaterial;

  const fPanelBottomUV = new BABYLON.Vector4(0, 0, 0, 0);
  const bPanelBottomUV = new BABYLON.Vector4(0.7125, 0, 0.95, 0.36);
  const panelBottom = BABYLON.MeshBuilder.CreatePlane("plane", {
    frontUVs: fPanelBottomUV,
    backUVs: bPanelBottomUV,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    size: 3,
  });
  panelBottom.addRotation(-1.57, 3.14, 0);
  panelBottom.position = new BABYLON.Vector3(0, -1.5, 1.5);
  panelBottom.material = dynamicMaterial;

  const panelTopBox = BABYLON.MeshBuilder.CreateBox(
    "Box",
    { width: 3, height: 0.01, depth: 0.01 },
    scene,
    true
  );
  panelTopBox.position = new BABYLON.Vector3(0, 1.5, 3);
  panelTopBox.isVisible = false;

  const fPanelTopUV = new BABYLON.Vector4(0, 0, 0, 0);
  const bPanelTopUV = new BABYLON.Vector4(0.7125, 0.64, 0.95, 0.97);
  const panelTop = BABYLON.MeshBuilder.CreatePlane("plane", {
    frontUVs: fPanelTopUV,
    backUVs: bPanelTopUV,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    size: 3,
  });
  panelTop.addRotation(1.57, 3.14, 0);
  panelTop.position = new BABYLON.Vector3(0, 0, -1.5);
  panelTop.parent = panelTopBox;
  panelTop.material = dynamicMaterial;

  //top tack
  var shapeTopTuck = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(-3, 0, 0),
    new BABYLON.Vector3(-3, 0, 0.4),
    new BABYLON.Vector3(-2.9, 0, 0.5),
    new BABYLON.Vector3(-0.1, 0, 0.5),
    new BABYLON.Vector3(0, 0, 0.4),
    // new BABYLON.Vector3(0, 0, 0.5),
  ];

  var topTuckBox = BABYLON.MeshBuilder.CreateBox(
    "Box",
    { width: 3, height: 0.5, depth: 0.5 },
    scene,
    true
  );
  topTuckBox.position = new BABYLON.Vector3(0, 1.5, 0);
  topTuckBox.rotation.x = 0.2;
  topTuckBox.parent = panelTop;
  topTuckBox.isVisible = false;

  var ftopTuck = new BABYLON.Vector4(0, 0, 0, 0); // front image = half the whole image along the width
  var btopTuck = new BABYLON.Vector4(0.7125, 0.97, 0.95, 1); // back image = second half along the width

  var topTuck = BABYLON.MeshBuilder.CreatePolygon(
    "",
    {
      shape: shapeTopTuck,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      frontUVs: ftopTuck,
      backUVs: btopTuck,
    },
    scene
  );
  topTuck.position = new BABYLON.Vector3(1.5, 0, 0);
  // topTuck.addRotation(0, -1.55, 3.14);
  topTuck.material = dynamicMaterial;
  topTuck.parent = topTuckBox;

  function animRotX(start, end) {
    const anim = new BABYLON.Animation(
      "animRotX",
      "rotation.x",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    anim.setKeys([
      { frame: 0, value: start },
      { frame: 30, value: end },
    ]);
    return anim;
  }

  function animRotZ(start, end) {
    const anim = new BABYLON.Animation(
      "animRotZ",
      "rotation.z",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    anim.setKeys([
      { frame: 0, value: start },
      { frame: 30, value: end },
    ]);
    return anim;
  }
  //box status
  var boxOpen = false;
  // GUI
  var advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Open Lid");
  button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  button1.top = -50 + "px";
  button1.width = "150px";
  button1.height = "40px";
  button1.color = "white";
  button1.cornerRadius = 20;
  button1.background = "green";
  button1.onPointerUpObservable.add(function () {
    if (!boxOpen) {
      const animationsPanelTop = [animRotX(0, 2)];

      scene.beginDirectAnimation(
        panelTopBox,
        animationsPanelTop,
        0,
        30,
        false,
        1
      );

      const animationsTopTuck = [animRotX(0.2, -1.2)];

      scene.beginDirectAnimation(
        topTuckBox,
        animationsTopTuck,
        0,
        30,
        false,
        1
      );
      setTimeout(function () {
        const animationsDustFlapTopLeft = [animRotZ(-3.6, -0.8)];
        scene.beginDirectAnimation(
          dustFlapTopLeftBox,
          animationsDustFlapTopLeft,
          0,
          30,
          false,
          1
        );
        const animationsDustFlapTopRight = [animRotZ(-0.5, 2.3)];
        scene.beginDirectAnimation(
          dustFlapTopRightBox,
          animationsDustFlapTopRight,
          0,
          30,
          false,
          1
        );
      }, 1000);
      boxOpen = true;
      button1.children[0].text = "Close Lid";
    } else {
      setTimeout(function () {
        const animationsPanelTop = [animRotX(0, 2)];
        scene.beginDirectAnimation(
          panelTopBox,
          animationsPanelTop,
          30,
          0,
          false,
          1
        );

        const animationsTopTuck = [animRotX(0.2, -1.2)];
        scene.beginDirectAnimation(
          topTuckBox,
          animationsTopTuck,
          30,
          0,
          false,
          1
        );
      }, 1000);
      const animationsDustFlapTopLeft = [animRotZ(-3.6, -0.8)];
      scene.beginDirectAnimation(
        dustFlapTopLeftBox,
        animationsDustFlapTopLeft,
        30,
        0,
        false,
        1
      );

      const animationsDustFlapTopRight = [animRotZ(-0.5, 2.3)];
      scene.beginDirectAnimation(
        dustFlapTopRightBox,
        animationsDustFlapTopRight,
        30,
        0,
        false,
        1
      );
      boxOpen = false;
      button1.children[0].text = "Open Lid";
    }
  });
  advancedTexture.addControl(button1);

  fabricCanvas.renderAll();
  groundTexture.update();

  // Update Texture when fabricjs canvas changed
  fabricCanvas.on("after:render", function () {
    groundTexture.update();
  });

  var onPointer = function (event) {
    event.stopPropagation();
    var e = getEvent(event.type.replace("pointer", "mouse"), event);
    //console.log(e);
    if (e != null) {
      if (e != null) {
        fabricCanvas.upperCanvasEl.dispatchEvent(e);
      }
    }

    // Set current cursor used by fabricjs
    canvas.style.cursor = fabricCanvas.upperCanvasEl.style.cursor;
    // Important for Internet Explorer!
    return false;
  };

  // Get Converted Event by name
  var getEvent = function (name, event) {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var texcoords = pickResult.getTextureCoordinates();

    if (texcoords) {
      var clicked_x = texcoords.x;
      var clicked_y = texcoords.y;

      var posX = (clicked_x * textureWidth) | 0;
      var posY = (textureWidth - clicked_y * textureHeight) | 0;

      var rect1 = fabricCanvas.upperCanvasEl.getBoundingClientRect();

      var clientX = (posX + rect1.left) | 0;
      var clientY = (posY + rect1.top) | 0;

      // Doesn't matter
      var screenX = 0; //clientX;// - $(window).scrollLeft();
      var screenY = 0; //clientY;// - $(window).scrollTop();

      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent(
        name,
        true,
        true,
        window,
        1,
        screenX,
        screenY,
        clientX,
        clientY,
        event.ctrlKey,
        event.altKey,
        event.shiftKey,
        event.metaKey,
        event.button,
        canvas.upperCanvasEl
      );

      return evt;
    } else {
    }
    return null;
  };

  canvas.addEventListener("pointerdown", onPointer, false);
  canvas.addEventListener("pointerup", onPointer, false);
  canvas.addEventListener("pointermove", onPointer, false);

  scene.onDispose = function () {
    canvas.removeEventListener("pointerdown", onPointer);
    canvas.removeEventListener("pointerup", onPointer);
    canvas.removeEventListener("pointermove", onPointer);
  };

  //END OF SCENE
  return scene;
};

window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
