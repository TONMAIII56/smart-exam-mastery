
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Trophy, Target, BookOpen, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null);
  const navigate = useNavigate();

  const examTypes = [
    {
      id: "civil-service",
      title: "การสอบราชการ",
      description: "ข้อสอบเตรียมสอบข้าราชการ ภาค ก และ ภาค ข",
      subjects: ["ความรู้ทั่วไป", "ภาษาไทย", "คณิตศาสตร์", "ภาษาอังกฤษ"],
      difficulty: "ปานกลาง",
      duration: "3 ชั่วโมง",
      questions: 100,
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      id: "toeic",
      title: "TOEIC",
      description: "แบบทดสอบภาษาอังกฤษเพื่อการสื่อสารในสภาพแวดล้อมการทำงาน",
      subjects: ["Listening", "Reading"],
      difficulty: "ยาก",
      duration: "2 ชั่วโมง",
      questions: 200,
      icon: Brain,
      color: "bg-green-500"
    },
    {
      id: "aisa",
      title: "AISA",
      description: "แบบทดสอบความถนัดสำหรับการสมัครงาน AIS",
      subjects: ["Logical Reasoning", "Numerical", "Verbal"],
      difficulty: "ยาก",
      duration: "1.5 ชั่วโมง",
      questions: 75,
      icon: Target,
      color: "bg-purple-500"
    }
  ];

  const recentResults = [
    {
      examType: "การสอบราชการ - ภาค ก",
      subject: "ความรู้ทั่วไป",
      score: 78,
      date: "2024-01-15",
      status: "ผ่าน"
    },
    {
      examType: "TOEIC Practice",
      subject: "Listening",
      score: 65,
      date: "2024-01-12",
      status: "ควรปรับปรุง"
    },
    {
      examType: "การสอบราชการ - ภาค ข",
      subject: "ภาษาไทย",
      score: 85,
      date: "2024-01-10",
      status: "ดีเยี่ยม"
    }
  ];

  const stats = [
    {
      title: "ข้อสอบที่ทำแล้ว",
      value: "12",
      description: "ในเดือนนี้",
      icon: BookOpen,
      trend: "+3 จากเดือนที่แล้ว"
    },
    {
      title: "คะแนนเฉลี่ย",
      value: "76%",
      description: "ทุกวิชา",
      icon: Trophy,
      trend: "+5% จากเดือนที่แล้ว"
    },
    {
      title: "เวลาที่ใช้",
      value: "24 ชม.",
      description: "ในเดือนนี้",
      icon: Clock,
      trend: "+8 ชม. จากเดือนที่แล้ว"
    },
    {
      title: "เป้าหมาย",
      value: "3/5",
      description: "ที่ทำสำเร็จ",
      icon: Target,
      trend: "ใกล้ถึงเป้าหมาย"
    }
  ];

  const handleStartExam = (examTypeId: string) => {
    setSelectedExamType(examTypeId);
    // Navigate to specific exam or quiz selection
    if (examTypeId === "civil-service") {
      navigate("/exam-selection");
    } else {
      navigate("/quiz-selection");
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">ยินดีต้อนรับสู่ระบบทำข้อสอบ</h1>
        <p className="opacity-90">เตรียมพร้อมสำหรับการสอบของคุณด้วยแบบทดสอบที่หลากหลาย</p>
        <div className="mt-4 flex gap-4">
          <Button 
            variant="secondary" 
            onClick={() => navigate("/exam-selection")}
          >
            เริ่มทำข้อสอบ
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
            ดูผลการสอบ
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600">{stat.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exam Types */}
      <div>
        <h2 className="text-xl font-semibold mb-4">เลือกประเภทการสอบ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examTypes.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`${exam.color} p-3 rounded-lg`}>
                    <exam.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline">{exam.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {exam.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{exam.questions} คำถาม</span>
                    <span>{exam.duration}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleStartExam(exam.id)}
                  >
                    เริ่มทำข้อสอบ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">ผลการสอบล่าสุด</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">การสอบ</th>
                    <th className="text-left p-4 font-medium">วิชา</th>
                    <th className="text-left p-4 font-medium">คะแนน</th>
                    <th className="text-left p-4 font-medium">วันที่</th>
                    <th className="text-left p-4 font-medium">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {recentResults.map((result, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="p-4 font-medium">{result.examType}</td>
                      <td className="p-4 text-gray-600">{result.subject}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.score}%</span>
                          <Progress value={result.score} className="w-16 h-2" />
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(result.date).toLocaleDateString('th-TH')}
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={
                            result.status === "ผ่าน" ? "default" : 
                            result.status === "ดีเยี่ยม" ? "default" : 
                            "secondary"
                          }
                          className={
                            result.status === "ดีเยี่ยม" ? "bg-green-100 text-green-800" :
                            result.status === "ผ่าน" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {result.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Progress */}
      <div>
        <h2 className="text-xl font-semibold mb-4">ความคืบหน้าการเรียน</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">เป้าหมายรายเดือน</CardTitle>
              <CardDescription>ความคืบหน้าในเดือนมกราคม 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ข้อสอบที่ทำ</span>
                    <span>12/15</span>
                  </div>
                  <Progress value={80} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>คะแนนเฉลี่ยเป้าหมาย</span>
                    <span>76/80%</span>
                  </div>
                  <Progress value={95} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>เวลาศึกษา</span>
                    <span>24/30 ชม.</span>
                  </div>
                  <Progress value={80} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">แนะนำการปรับปรุง</CardTitle>
              <CardDescription>จุดที่ควรให้ความสำคัญ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">คณิตศาสตร์</p>
                    <p className="text-xs text-gray-600">คะแนนเฉลี่ย 65% ควรปรับปรุง</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">ภาษาอังกฤษ</p>
                    <p className="text-xs text-gray-600">ทำแบบทดสอบเพิ่มอีก 3 ครั้ง</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">ความรู้ทั่วไป</p>
                    <p className="text-xs text-gray-600">ผลงานดี คงระดับต่อไป</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
