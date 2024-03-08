import "package:flutter/material.dart";
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/attendance.dart';
import 'package:mobile_app/models/attendanceList.dart';
import 'package:mobile_app/screens/year_month_screen.dart';
import 'package:mobile_app/screens/date_attendance_screen.dart';

class AttendanceScreen extends StatefulWidget {
  final String sessionID;
  final String userID;
  const AttendanceScreen({
    required this.sessionID,
    required this.userID,
    super.key,
  });

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  List<Attendance> _attendances = [];
  late final String _userID;
  late final String _sessionID;
  int _year = DateTime.now().year;
  int _month = DateTime.now().month;

  @override
  void initState() {
    super.initState();
    _userID = widget.userID;
    _sessionID = widget.sessionID;
    _initializeAttendanceList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          YearMonthPicker(
            onChanged: (year, month) {
              _updateAttendanceList(year, month);
            },
          ),
        ],
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    vertical: 12,
                    horizontal: 36,
                  ),
                  child: Text(
                    _userID,
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(
                    vertical: 12,
                    horizontal: 36,
                  ),
                  child: Text(
                    'さんの出退勤記録',
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: DateScreen(
                year: _year,
                month: _month,
                attendances: _attendances,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<AttendanceList> getAttendanceList(String year, String month) async {
    final uri = Uri.https(
        'backend.koki20001206.workers.dev', '/api/employee/attendance', {
      'year': year,
      'month': month.padLeft(2, "0"),
    });
    final http.Response res = await http.get(uri, headers: {
      'Authorization': 'Bearer $_sessionID',
      'Content-type': 'application/json'
    });

    if (res.statusCode == 200) {
      Map<String, dynamic> body = jsonDecode(res.body);
      return AttendanceList.fromJson(body);
    } else {
      throw Exception('Failed to get AttendanceList');
    }
  }

  Future<void> _updateAttendanceList(int year, int month) async {
    final results = await getAttendanceList(year.toString(), month.toString());
    setState(() {
      _attendances = results.getAttendances();
      _year = year;
      _month = month;
    });
  }

  Future<void> _initializeAttendanceList() async {
    final results =
        await getAttendanceList(_year.toString(), _month.toString());
    setState(() {
      _attendances = results.getAttendances();
    });
  }
}
