//参考:https://zenn.dev/sdkfz181tiger/books/735e854bee9fc9
//真似したい：https://dp778.co.jp/blog/production/6743/

const W_WIDTH  = window.innerWidth; // ブラウザの横サイズ
const W_HEIGHT = window.innerHeight;// ブラウザの縦サイズ
const W_ASPECT = window.innerWidth / window.innerHeight;// アスペクト比
const W_RATIO  = window.devicePixelRatio;// ピクセル比
let camera, scene, renderer, earth, moon;// カメラ、シーン、レンダラー、立方体

let radius = 300;// 半径
let radian = 0;// 角度

window.onload = ()=>{
	// ここに初期化コードを記述します
    // 1, カメラを作る
    //perspectivecamera(視野角,アスペクト比,near,far)
    //position(x,y,z)
	camera = new THREE.PerspectiveCamera(50, W_ASPECT, 1, 1000);
	camera.position.set(0, 0, 600);
	// 2, シーンを作る
	scene = new THREE.Scene();
	// 3-1, ライトを作る1 (単光の光)
	let dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(5,3,5);// 光の向き
	scene.add(dirLight);
	// 3-2, ライトを作る2 (いい感じの光)
	let ambLight = new THREE.AmbientLight(0x333333);
	scene.add(ambLight);
	// 4, レンダラーを作る (3D空間に描画)
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(W_RATIO);// ピクセル比
	renderer.setSize(W_WIDTH, W_HEIGHT);//描画範囲
	// 5, HTMLに配置する
	let div = document.getElementById("three");//htmlのdiv指定
	div.appendChild(renderer.domElement);//レンダラーを貼り付ける
	// 地球を作る
	earth = createMesh(200, "./assets/earth_tx.png");
	scene.add(earth);
	// 月を作る
	moon = createMesh(30, "./assets/moon_tx.png");
	scene.add(moon);
	// アニメーションの開始
	animate();
}

function animate(){
	earth.rotation.y += 0.002;// 地球を回転させる
	moon.rotation.y += 0.002;// 月を回転させる
	moon.position.x = radius * Math.cos(radian);// 月を周回させる
	moon.position.z = radius * Math.sin(radian);
	radian += 0.01;// 角度に加算する
	renderer.render(scene, camera);// レンダリング
	requestAnimationFrame(animate);// 更新
}

function createMesh(w, path){
	// テクスチャ
	let txLoader  = new THREE.TextureLoader();
	let normalMap = txLoader.load(path);
	// ジオメトリ
	let geometry = new THREE.SphereBufferGeometry(w, 30, 30);
	// マテリアル
	let material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: normalMap
	});
	// メッシュ
	let mesh = new THREE.Mesh(geometry, material);
	return mesh;
}