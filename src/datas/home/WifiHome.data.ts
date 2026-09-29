interface WifiHomeProps {
    id: number;
    title: string;
    price: string;
    speedDownload: string;
    speedUpload: string;
    package: {
      icon: string;
      title: string;
    }[];
    promotion: string;
    action: string;
    note: string;
    promise: string;
    unit: string;
  }
  
  export const dataWifiHome: WifiHomeProps[] = [
    {
      id: 1,
      title: "แพ็คเกจเน็ตบ้านสุดค้ม!!!",
      price: "499",
      speedDownload: "500",
      speedUpload:"500",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "ระยะสัญญา 12 เดือน",
      package: [
        {
          icon: "/assets/tol-ico/tol-icon-4.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-3.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 10GB.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-2.png",
          title: "",
        },


       
      ],
      note:"สามารถเลือกได้ 1 อย่าง",
      action: "action",
      unit:"Mbps"
    },
    {
      id: 2,
      title: "แพ็คเกจสุดค้ม",  
      price: "599",
      speedDownload: "700",
      speedUpload:"700",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "",
      package: [
        {
          icon: "/assets/tol-ico/tol-icon-1.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-2.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-4.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/true-visions-now-joy.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/iQIYI.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 10GB.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/viu.png",
          title: "",
        },
      ],
      note:"",
      action: "action",
      unit:"Mbps"
    },
    {
      id: 3,
      title: "แพ็กเกจฟรีประกันภัยและกล้องวงจรปิด",
      price: "600",
      speedDownload: "500",
      speedUpload:"500",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "",
      package: [
        {
          icon: "/assets/tol-ico/tol-icon-1.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-3.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 10GB.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-5.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/ico-fwd.jpg",
          title: "",
        },
        {
          icon: "/assets/tol-ico/true-visions-now-joy.png",  
          title: "",
        }
        
      ],
      note:"",
      action: "action",
      unit:"Mbps"
    },
    {
      id: 4,
      title: "แพ็กเกจฟรีประกันภัยและกล้องวงจรปิดใน-นอกบ้าน",
      price: "650",
      speedDownload: "500",
      speedUpload:"500",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "",
      package: [
        {
          icon: "/assets/tol-ico/tol-icon-1.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-3.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/Camera.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 10GB.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-5.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/ico-fwd.jpg",
          title: "",
        },
        {
          icon: "/assets/tol-ico/true-visions-now-joy.png",
          title: "",
        },
       
      ],
      note:"",
      action: "action",
      unit:"Mbps"
    },
    {
      id: 5,
      title: "ใหม่! PStreaming, Gaming, WorkingRO AI 1Gbps",
      price: "799",
      speedDownload: "1",
      speedUpload:"1",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "",
      package: [
        {
          icon: "/assets/tol-ico/Router.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 20GB.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-3.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/ico-gaming-nation.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/true-visions-now-joy.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/viu.png",
          title: "",
        },
       
      ],
      note:"",
      action: "action",
      unit:"Gbps"
    },
    {
      id: 6,
      title: "TrueOnline Super Netflix Premium",
      price: "999",
      speedDownload: "500",
      speedUpload:"500",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "",
      package: [
        {
          icon: "/assets/tol-ico/tol-icon-1.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-4.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/icon-netflix.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/true-visions-now-joy.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 10GB.png",
          title: "",
        },
      ],
      note:"",
      action: "action",
      unit:"Mbps"
    },
    {
      id: 6,
      title: "TrueOnline Super Netflix Premium",
      price: "1,199",
      speedDownload: "1.5",
      
      speedUpload:"1.5",
      promise:"ระยะสัญญา 24 เดือน",
      promotion: "",
      package: [
        {
          icon: "/assets/tol-ico/tol-icon-1.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-2.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-4.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/sim 20GB.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/tol-icon-3.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/viu.png",
          title: "",
        },
       
        {
          icon: "/assets/tol-ico/image 354.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/image 352.png",
          title: "",
        },
        {
          icon: "/assets/tol-ico/ico-gaming-nation.png",
          title: "",
        },
     
      ],
      note:"",
      action: "action",
      unit:"Gbps"
    },
  ];