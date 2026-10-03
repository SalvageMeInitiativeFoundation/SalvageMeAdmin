import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiChevronDown, FiChevronUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import Spinner from "../shared/spinner";
import { UserContext } from "../context/userContext/userContext";

const PAGE_SIZE = 9;

const formatValue = (value) => {
	if (value === null || value === undefined) return "-";
	if (typeof value === "string") return value;
	return JSON.stringify(value, null, 2);
};

const formatDate = (value) => {
	if (!value) return "-";
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

function AuditLogs() {
	const { user } = useContext(UserContext);
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [level, setLevel] = useState("all");
	const [method, setMethod] = useState("all");
	const [expandedLog, setExpandedLog] = useState(null);
	const [page, setPage] = useState(1);

	const fetchLogs = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/audit/logs`,
				{ headers: { Authorization: `Bearer ${user?.[0]?.accessToken}` } }
			);
			setLogs(Array.isArray(response.data?.logs) ? response.data.logs : []);
			setPage(1);
		} catch (error) {
			toast.error(error?.response?.data?.message || error?.message || "Could not fetch audit logs", {
				position: "top-right",
				autoClose: 5000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (user?.[0]?.accessToken) fetchLogs();
	}, [user]);

	const levels = useMemo(() => ["all", ...new Set(logs.map((log) => log.level).filter(Boolean))], [logs]);
	const methods = useMemo(() => ["all", ...new Set(logs.map((log) => log.method).filter(Boolean))], [logs]);

	const filteredLogs = useMemo(() => {
		const query = search.trim().toLowerCase();
		return logs.filter((log) => {
			const searchable = [log.route, log.message, log.clientIp, log.method, log.statusCode].join(" ").toLowerCase();
			return (
				(level === "all" || log.level === level) &&
				(method === "all" || log.method === method) &&
				(!query || searchable.includes(query))
			);
		});
	}, [logs, level, method, search]);

	const pageCount = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
	const visibleLogs = filteredLogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	const countBy = (predicate) => logs.filter(predicate).length;

	useEffect(() => {
		if (page > pageCount) setPage(pageCount);
	}, [page, pageCount]);

	return (
		<section className="auditPage">
			<div className="auditHeading">
				<div>
					<h1 className="PageTitle">Audit Logs</h1>
					<p className="pageSubtitle">Trace platform activity, API responses, and administrative actions.</p>
				</div>
				<button type="button" className="auditRefreshButton" onClick={fetchLogs} disabled={isLoading}>
					<FiRefreshCw size={16} /> Refresh
				</button>
			</div>

			<div className="auditStats" aria-label="Audit log summary">
				<div><strong>{logs.length}</strong><span>Total events</span></div>
				<div><strong>{countBy((log) => log.level === "info")}</strong><span>Informational</span></div>
				<div><strong>{countBy((log) => Number(log.statusCode) >= 400)}</strong><span>Errors</span></div>
			</div>

			<div className="auditToolbar">
				<label className="auditSearch"><FiSearch size={17} /><input type="search" placeholder="Search route, message, IP..." value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label>
				<select value={level} onChange={(event) => { setLevel(event.target.value); setPage(1); }} aria-label="Filter by log level">
					{levels.map((value) => <option key={value} value={value}>{value === "all" ? "All levels" : value}</option>)}
				</select>
				<select value={method} onChange={(event) => { setMethod(event.target.value); setPage(1); }} aria-label="Filter by request method">
					{methods.map((value) => <option key={value} value={value}>{value === "all" ? "All methods" : value}</option>)}
				</select>
			</div>

			<div className="auditTable">
				<div className="auditTableHeader"><span>Level</span><span>Request</span><span>Status</span><span>Timestamp</span><span aria-hidden="true" /></div>
				{isLoading ? <Spinner /> : visibleLogs.length === 0 ? (
					<div className="auditEmpty"><strong>No audit events found</strong><span>Try changing your search or filters.</span></div>
				) : visibleLogs.map((log, index) => {
					const rowId = `${log.timestamp}-${log.route}-${index}`;
					const isExpanded = expandedLog === rowId;
					return (
						<article className={`auditRow ${isExpanded ? "isExpanded" : ""}`} key={rowId}>
							<button type="button" className="auditRowSummary" onClick={() => setExpandedLog(isExpanded ? null : rowId)} aria-expanded={isExpanded}>
								<span className={`auditLevel ${log.level || "unknown"}`}>{log.level || "unknown"}</span>
								<span className="auditRequest"><strong>{log.method || "-"}</strong><span>{log.route || "-"}</span></span>
								<span className={`auditStatus ${Number(log.statusCode) >= 400 ? "error" : "success"}`}>{log.statusCode || "-"}</span>
								<span className="auditTimestamp">{formatDate(log.timestamp)}</span>
								<span className="auditExpand">{isExpanded ? <FiChevronUp /> : <FiChevronDown />}</span>
							</button>
							{isExpanded && <div className="auditDetails"><div><small>Message</small><p>{log.message || "-"}</p></div><div><small>Client IP</small><p>{log.clientIp || "-"}</p></div><div><small>Request body</small><pre>{formatValue(log.requestBody)}</pre></div><div><small>Response body</small><pre>{formatValue(log.responseBody)}</pre></div></div>}
						</article>
					);
				})}
			</div>
			{!isLoading && filteredLogs.length > 0 && <div className="auditPagination"><span>Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filteredLogs.length)} of {filteredLogs.length}</span><div><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>Previous</button><span>Page {page} of {pageCount}</span><button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount}>Next</button></div></div>}
		</section>
	);
}

export default AuditLogs;
